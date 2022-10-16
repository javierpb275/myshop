import { IProduct } from "../../interfaces/product.interface";
import ProductCardComponent from "../product-card/product-card.component";

export interface IProductCardListComponentProps {
  products: IProduct[];
}

const ProductCardListComponent: React.FunctionComponent<
  IProductCardListComponentProps
> = (props) => {
  return (
    <div>
      {props.products.map((product) => {
        return (
          <ProductCardComponent key={product.product_id} product={product} />
        );
      })}
    </div>
  );
};

export default ProductCardListComponent;
