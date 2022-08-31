import { withNavServerSideProps } from "../../lib/nav-wrapper-ssr";

import {
  getSearchSSRProps,
  ISearch,
  SearchQuery,
} from "../../lib/search-props";
import Search from "../../components/search/SearchPage";
import { buildBreadcrumbLookup } from "../../lib/build-breadcrumb-lookup";
import { BuilderComponent } from '@builder.io/react';
import { chakra } from "@chakra-ui/react";

interface INodeSearch extends ISearch {
  nodeName?: string | string[];
}

export function NodeSearch(props: INodeSearch): JSX.Element {
  return (
          <><chakra.main>
            <BuilderComponent model="content" />
              <Search {...props} />
          </chakra.main></>
  );
}

export const getServerSideProps = withNavServerSideProps<ISearch, SearchQuery>(
  async (context, nav) => {
    return getSearchSSRProps(NodeSearch, buildBreadcrumbLookup(nav))(context);
  }
);

export default NodeSearch;
