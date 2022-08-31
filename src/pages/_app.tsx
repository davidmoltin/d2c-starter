import MainLayout from "../layouts/main-layout/MainLayout";
import StoreProvider from "../context/store";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { builder } from '@builder.io/react';
import theme from "../styles/theme";
import "focus-visible/dist/focus-visible";
import { BuilderComponent } from '@builder.io/react';

import "../components/checkout/CardSectionStyles.css";
import "../styles/globals.css";

builder.init('b0eaf95136f5471aacdd2e196aa5a102')

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <StoreProvider>
        <BuilderComponent model="announcement-bar" />
        <MainLayout nav={pageProps.nav}>
          <Component {...pageProps} />
        </MainLayout>
      </StoreProvider>
    </ChakraProvider>
  );
}

export default MyApp;
