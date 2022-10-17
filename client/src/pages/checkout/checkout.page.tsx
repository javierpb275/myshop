import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import ProductCheckoutComponent from "../../components/product-checkout/product-checkout.component";
import { RootState } from "../../store/reducers";
import {
  CheckoutPageContainer,
  CheckoutHeaderContainer,
  HeaderBlockContainer,
  TotalContainer,
} from "./checkout.styles";

export interface ICheckoutPageProps {}

const CheckoutPage: React.FunctionComponent<ICheckoutPageProps> = (props) => {
  const products = useSelector((state: RootState) => state.cart.products);
  const total = useMemo(
    () =>
      products.reduce((total, product) => {
        total += Number(product.price) * product.quantity;
        return total;
      }, 0),
    [products]
  );
  return (
    <CheckoutPageContainer>
      <CheckoutHeaderContainer>
        <HeaderBlockContainer>
          <span>Product</span>
        </HeaderBlockContainer>

        <HeaderBlockContainer>
          <span>Description</span>
        </HeaderBlockContainer>

        <HeaderBlockContainer>
          <span>Quantity</span>
        </HeaderBlockContainer>

        <HeaderBlockContainer>
          <span>Price</span>
        </HeaderBlockContainer>

        <HeaderBlockContainer>
          <span>Remove</span>
        </HeaderBlockContainer>
      </CheckoutHeaderContainer>

      {products.map((product) => {
        return (
          <ProductCheckoutComponent
            key={product.product_id}
            cartProduct={product}
          />
        );
      })}

      <TotalContainer>TOTAL: ${total}</TotalContainer>
    </CheckoutPageContainer>
  );
};

export default CheckoutPage;
