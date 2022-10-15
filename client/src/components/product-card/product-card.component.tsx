import React from "react";
import { IProduct } from "../../interfaces/product.interface";
import { Card, Flex, Image, Title, Value } from "./product-card.element";

export interface IProductCardComponentProps {
  product?: IProduct;
}

const ProductCardComponent: React.FunctionComponent<
  IProductCardComponentProps
> = (props) => {
  return (
    <>
      <Flex>
        <Card>
          <Image
            src="./images/bayside-apparel-mens-basic-t-shirt.jpg"
            alt="some-photo"
          />
          <Title>
            <h1>Bayside Apparel Mens Basic T-shirt</h1>
          </Title>
          <Value>
            <span className="price">$49.67</span>
            <span className="previous-price">$67.82</span>
          </Value>
        </Card>
      </Flex>
    </>
  );
};

export default ProductCardComponent;
