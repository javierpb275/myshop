import React from "react";
import { useDispatch } from "react-redux";
import {
  addToCart,
  IProductInCart,
  removeFromCart,
  removeAllFromCart,
} from "../../store/reducers/cartReducer";
import {
  CheckoutItemContainer,
  ImageContainer,
  TextContainer,
  QuantityContainer,
  RemoveButtonContainer,
} from "./product-checkout.styles";

export interface IProductCheckoutComponentProps {
  cartProduct: IProductInCart;
}

const ProductCheckoutComponent: React.FunctionComponent<
  IProductCheckoutComponentProps
> = (props) => {
  const dispatch = useDispatch();
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={props.cartProduct.image_url} alt={props.cartProduct.name} />
      </ImageContainer>
      <TextContainer>{props.cartProduct.name}</TextContainer>
      <QuantityContainer>
        <div onClick={() => dispatch(removeFromCart(props.cartProduct))}>
          &#10134;
        </div>
        <span>{props.cartProduct.quantity}</span>
        <div onClick={() => dispatch(addToCart(props.cartProduct))}>
          &#10133;
        </div>
      </QuantityContainer>
      <TextContainer>{props.cartProduct.price}</TextContainer>
      <RemoveButtonContainer
        onClick={() => dispatch(removeAllFromCart(props.cartProduct))}
      >
        &#10054;
      </RemoveButtonContainer>
    </CheckoutItemContainer>
  );
};

export default ProductCheckoutComponent;
