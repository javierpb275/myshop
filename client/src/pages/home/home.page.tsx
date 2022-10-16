import React, { useCallback, useEffect, useState } from "react";
import ProductCardListComponent from "../../components/product-card-list/product-card-list.component";
import { IProduct } from "../../interfaces/product.interface";
import { ProductService } from "../../services/productService";

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cleanedUp, setCleanedUp] = useState(false);
  const fetchData = useCallback(async () => {
    const response = await ProductService.getProducts();
    if (response.error) {
      setError(true);
      setIsLoading(false);
      return;
    }
    setProducts(response.data.products);
    setIsLoading(false);
  }, []);
  useEffect(() => {
    if (!cleanedUp) {
      fetchData().catch((error) => {
        setError(true);
        setIsLoading(false);
      });
    }
    return () => setCleanedUp(true);
  }, [fetchData]);
  if (isLoading) {
    return <h1>LOADING PRODUCTS...</h1>;
  } else if (error) {
    return <h1>SOMETHING WENT WRONG!</h1>;
  } else {
    if (!products.length) {
      return <h1>NO PRODUCTS FOUND</h1>;
    } else {
      return <ProductCardListComponent products={products} />;
    }
  }
};

export default HomePage;
