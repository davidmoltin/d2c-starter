import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useInstantSearch } from "react-instantsearch-hooks-web";
import { dequal } from "dequal";

import type { UiState } from "instantsearch.js";

export type NextRouterHandlerProps<TRouteParams> = {
  dynamicRouteQuery?: Record<string, string | string[]>;
  routeToState: (params: TRouteParams) => UiState;
  stateToRoute: (uiState: UiState) => TRouteParams;
  writeDelay?: number;
};

function removeSearchParams(url: string) {
  return url.replace(/(\?.+)/, "");
}

function removeUndefinedParams<TRouteParams>(
  params: TRouteParams
): Record<string, string | string[]> {
  return Object.entries(params).reduce((queries, [key, value]) => {
    if (typeof value !== "undefined") {
      return { ...queries, [key]: value };
    }
    return queries;
  }, {});
}

function urlToParams(url: string): Record<string, string | string[]> {
  return Array.from(new URL(url).searchParams.entries()).reduce<{
    [key: string]: string | string[];
  }>((acc, [key, value]) => {
    const valueAtKey: string | string[] | undefined = acc[key];
    return {
      ...acc,
      [key]: valueAtKey
        ? Array.isArray(valueAtKey)
          ? [...valueAtKey, value]
          : [valueAtKey, value]
        : value,
    };
  }, {});
}

function NextRouterHandler<
  TRouteParams extends Record<string, unknown> = Record<string, string>
>({
  dynamicRouteQuery = {},
  routeToState,
  stateToRoute,
  writeDelay,
}: NextRouterHandlerProps<TRouteParams>) {
  const router = useRouter();
  const { use, setUiState } = useInstantSearch();
  const [isLeaving, setIsLeaving] = useState(false);
  const [stableQuery, setStableQuery] = useState(router?.query || {});
  const routerPushTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (!dequal(stableQuery, router?.query || {})) {
    setStableQuery(router?.query || {});
  }

  // Track router path
  useEffect(() => {
    function onRouteChangeStart(url: string) {
      if (removeSearchParams(url) !== removeSearchParams(router.asPath)) {
        setIsLeaving(true);
      }
    }

    router.events.on("routeChangeStart", onRouteChangeStart);
    return () => router.events.off("routeChangeStart", onRouteChangeStart);
  }, [router]);

  // Route to state
  useEffect(() => {
    const uiState = routeToState(stableQuery as TRouteParams);
    setUiState(uiState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stableQuery]);

  // State to route
  useEffect(() => {
    if (isLeaving) {
      return;
    }

    return use(() => ({
      onStateChange({ uiState }) {
        if (routerPushTimerRef.current) {
          clearTimeout(routerPushTimerRef.current);
        }
        routerPushTimerRef.current = setTimeout(() => {
          const query = {
            ...dynamicRouteQuery,
            ...removeUndefinedParams<TRouteParams>(stateToRoute(uiState)),
          };
          // If nodes defined then dynamic path name otherwise standard
          const pathname = query.node ? "/search/[...node]" : "/search";

          router.push({
            pathname,
            query,
          });
        }, writeDelay);
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [use, isLeaving]);

  return null;
}

export function useNextRouterHandler<
  TRouteParams extends Record<string, unknown> = Record<string, string>
>({
  dynamicRouteQuery = {},
  routeToState,
  stateToRoute,
  url,
  writeDelay = 400,
}: NextRouterHandlerProps<TRouteParams> & { url: string }) {
  const [stableDynamicRouteQuery, setStableDynamicRouteQuery] =
    useState(dynamicRouteQuery);

  if (!dequal(stableDynamicRouteQuery, dynamicRouteQuery)) {
    setStableDynamicRouteQuery(dynamicRouteQuery);
  }

  return {
    initialUiState: routeToState(urlToParams(url) as TRouteParams),
    NextRouterHandler: useCallback(
      () =>
        NextRouterHandler({
          dynamicRouteQuery,
          routeToState,
          stateToRoute,
          writeDelay,
        }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [stableDynamicRouteQuery]
    ),
  };
}
