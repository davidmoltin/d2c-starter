import type { NextPage } from "next";
import { chakra } from "@chakra-ui/react";

import type { Node, Promotion } from "@moltin/sdk";
import { ProductResponseWithImage } from "../lib/product-types";


import { withNavStaticProps } from "../lib/nav-wrapper-ssg";
import { BuilderComponent } from '@builder.io/react';

const nodeId = process.env.NEXT_PUBLIC_DEMO_NODE_ID || "";
const promotionId = process.env.NEXT_PUBLIC_DEMO_PROMO_ID || "";

export interface IHome {

}

const Home: NextPage<IHome> = ({

}) => {
  return (
  <><>
        <chakra.main>
          <BuilderComponent model="content" />
          <BuilderComponent model="product-listing" />
        </chakra.main></></>
  );
};

export const getStaticProps = withNavStaticProps<IHome>(async () => {
  // Fetching static data for the home page
  
  
  return {
    props: {
     
    },
  };
});

export default Home;