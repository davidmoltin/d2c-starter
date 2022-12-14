import ProductCarousel from "./carousel/ProductCarousel";
import { SimpleGrid, Stack } from "@chakra-ui/react";
import ProductSummary from "./ProductSummary";
import ProductDetails from "./ProductDetails";
import ProductExtensions from "./ProductExtensions";
import CartActions from "./CartActions";
import { IBase } from "../../lib/product-types";
import { ReactElement } from "react";

interface IProductContainer {
  productBase: IBase;
  handleAddToCart: () => void;
  children?: ReactElement;
}

export default function ProductContainer({
  productBase: { product, main_image, otherImages },
  handleAddToCart,
  children,
}: IProductContainer): JSX.Element {
  const { extensions } = product.attributes;
  return (
    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 18, md: 24 }}
    >
      {main_image && (
        <ProductCarousel images={otherImages} mainImage={main_image} />
      )}
      <Stack spacing={{ base: 6, md: 10 }}>
        <ProductSummary product={product} />
        <ProductDetails product={product} />
        {extensions && <ProductExtensions extensions={extensions} />}
        {children}
        <CartActions handleAddToCart={handleAddToCart} />
      </Stack>
    </SimpleGrid>
  );
}
