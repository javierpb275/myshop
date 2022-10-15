import { IProduct } from "../../interfaces/product.interface";
import ProductCardComponent from "../product-card/product-card.component";

export interface IProductCardListComponentProps {
  products?: IProduct[];
}

const ProductCardListComponent: React.FunctionComponent<
  IProductCardListComponentProps
> = (props) => {
  const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <div>
      {testArray.map((product) => {
        return <ProductCardComponent key={product} />;
      })}
    </div>
  );
};

export default ProductCardListComponent;
