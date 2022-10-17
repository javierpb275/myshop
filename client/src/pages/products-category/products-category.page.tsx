import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCardListComponent from "../../components/product-card-list/product-card-list.component";
import { IProduct } from "../../interfaces/product.interface";
import { ProductService } from "../../services/productService";

export interface IProductsCategoryPageProps {}

const ProductsCategoryPage: React.FunctionComponent<
  IProductsCategoryPageProps
> = (props) => {
  const { sku } = useParams();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cleanedUp, setCleanedUp] = useState(false);
  useEffect(() => {
    if (!cleanedUp) {
      const fetchData = async () => {
        const response = await ProductService.searchProductsBySKU(sku!, {
          per_page: 9999,
        });
        if (response.error) {
          setError(true);
          setIsLoading(false);
          return;
        }
        setProducts(response.data.products);
        setIsLoading(false);
      };
      fetchData().catch((error) => {
        setError(true);
        setIsLoading(false);
      });
    }
    return () => setCleanedUp(true);
  }, [sku]);
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

export default ProductsCategoryPage;
