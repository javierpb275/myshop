import React from "react";
import ProductCardListComponent from "../../components/product-card-list/product-card-list.component";

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  return (
    <div>
      <ProductCardListComponent />
    </div>
  );
};

export default HomePage;
