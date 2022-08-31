import type { NextPage } from "next";
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next/types';
import { chakra, Grid, GridItem } from "@chakra-ui/react";

import type { Node, Promotion } from "@moltin/sdk";
import { ProductResponseWithImage } from "../lib/product-types";


import { withNavStaticProps } from "../lib/nav-wrapper-ssg";
import { BuilderComponent } from '@builder.io/react';

const nodeId = process.env.NEXT_PUBLIC_DEMO_NODE_ID || "";
const promotionId = process.env.NEXT_PUBLIC_DEMO_PROMO_ID || "";

export interface IHome {
  promotion?: Promotion;
  featuredProducts?: ProductResponseWithImage[];
  featuredNodes?: Node[];
}

const Home: NextPage<IHome> = ({

}) => {
  return (
  <><>
        <BuilderComponent model="content" />
        <chakra.main>
          
          <Grid gap="12" padding={{ base: "2rem", md: "4rem" }}>
            <GridItem>
              
            </GridItem>
            <GridItem>
              
            </GridItem>
          </Grid>
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