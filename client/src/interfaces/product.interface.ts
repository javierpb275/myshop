//PRODUCT
export interface IProduct {
  product_id: number;
  name: string;
  price: string;
  image_url: string;
  description?: string;
  stock: number;
  discount: string;
  sku: string;
  created_at: string;
  modified_at: string;
}
