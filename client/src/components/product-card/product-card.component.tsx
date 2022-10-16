import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { IProduct } from "../../interfaces/product.interface";
import { Card, Flex, Image, Title, Value } from "./product-card.element";
import { addToCart, removeFromCart } from "../../store/reducers/cartReducer";

export interface IProductCardComponentProps {
  product: IProduct;
}

const ProductCardComponent: React.FunctionComponent<
  IProductCardComponentProps
> = (props) => {
  const newPrice = useMemo(
    () =>
      Number(props.product.price) -
      Number(
        (
          Math.round(
            Number(props.product.price) *
              (Number(props.product.discount) / 100) *
              100
          ) / 100
        ).toFixed(2)
      ),
    [props.product.price, props.product.discount]
  );
  const dispatch = useDispatch();
  return (
    <>
      <Flex>
        <Card>
          <Image src={props.product.image_url} alt={props.product.name} />
          <Title>
            <h1>{props.product.name}</h1>
          </Title>
          <button
            onClick={() =>
              dispatch(
                addToCart({ ...props.product, price: newPrice.toString() })
              )
            }
          >
            Add to cart
          </button>
          <button onClick={() => dispatch(removeFromCart(props.product))}>
            Remove from cart
          </button>
          <Value>
            {Number(props.product.discount) <= 0 ? (
              <span className="price">${props.product.price}</span>
            ) : (
              <>
                <span className="new-price">${newPrice}</span>
                <span className="previous-price">${props.product.price}</span>
              </>
            )}
          </Value>
        </Card>
      </Flex>
    </>
  );
};

export default ProductCardComponent;
