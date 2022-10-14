import { API_URL } from "../config/constants";
import { getQuery } from "../helpers/query.helper";
import { FetchService } from "./fetchService";
import {
  IBasicQueryObject,
  IProductQueryObject,
  IResponse,
} from "./serviceTypes";

export class ProductService {
  static async getProducts(
    productQueryObject?: IProductQueryObject
  ): Promise<IResponse> {
    try {
      let url = API_URL.PRODUCTS.GET.ALL.URL;
      if (productQueryObject) {
        url += getQuery(productQueryObject);
      }
      const json = await FetchService.callApi(
        url,
        API_URL.PRODUCTS.GET.ALL.METHOD
      );
      let response: IResponse = await json.json();
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async searchProductsBySKU(
    SKU: string,
    basicQueryObject?: IBasicQueryObject
  ): Promise<IResponse> {
    try {
      let url = API_URL.PRODUCTS.SEARCH.BY_SKU.URL + SKU;
      if (basicQueryObject) {
        url += getQuery(basicQueryObject);
      }
      const json = await FetchService.callApi(
        url,
        API_URL.PRODUCTS.SEARCH.BY_SKU.METHOD
      );
      let response: IResponse = await json.json();
      return response;
    } catch (err: any) {
      return err;
    }
  }

  static async getProductById(product_id: string): Promise<IResponse> {
    try {
      const json = await FetchService.callApi(
        API_URL.PRODUCTS.GET.BY_ID.URL + product_id,
        API_URL.PRODUCTS.GET.BY_ID.METHOD
      );
      let response: IResponse = await json.json();
      return response;
    } catch (err: any) {
      return err;
    }
  }
}
