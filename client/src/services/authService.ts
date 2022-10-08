import { API_URL } from "../config/constants";
import { FetchService } from "./fetchService";
import {
  IBodySignIn,
  IBodySignUp,
  IResponse,
  IReturnDataSignIn,
  IReturnDataSignUp,
  IReturnDataTokenRefresh,
  ITokenData,
  Tokens,
} from "./serviceTypes";

export class AuthService {
  //SAVE USER TOKENS IN LOCALSTORAGE------------------------------
  static saveUserTokens(data: ITokenData) {
    localStorage.setItem(Tokens.ACCESS_TOKEN, data.access_token);
    localStorage.setItem(Tokens.REFRESH_TOKEN, data.refresh_token);
  }

  //REMOVE USER TOKENS FROM LOCALSTORAGE------------------------------------------------
  static removeTokens() {
    localStorage.removeItem(Tokens.ACCESS_TOKEN);
    localStorage.removeItem(Tokens.REFRESH_TOKEN);
  }

  //GET PROFILE--------------------------------------------------------
  static async getProfile(access_token: string): Promise<IResponse> {
    try {
      const json = await FetchService.callApi(
        API_URL.USERS.ME.GET.URL,
        API_URL.USERS.ME.GET.METHOD,
        undefined,
        {
          Authorization: `Bearer ${access_token}`,
        }
      );
      let response: IResponse = await json.json();
      return response;
    } catch (err: any) {
      return err;
    }
  }

  //SIGN UP-------------------------------------------------------
  static async signUp(user: IBodySignUp): Promise<IResponse> {
    try {
      const json = await FetchService.callApi(
        API_URL.USERS.SIGNUP.URL,
        API_URL.USERS.SIGNUP.METHOD,
        user
      );
      let response: IResponse = await json.json();
      if (response.error) {
        return response;
      }
      const data: IReturnDataSignUp = response.data;
      if (!data.access_token || !data.refresh_token) {
        return response;
      }
      AuthService.saveUserTokens({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      });
      return response;
    } catch (err: any) {
      return err;
    }
  }

  //SIGN IN-------------------------------------------------------
  static async signIn(user: IBodySignIn): Promise<IResponse> {
    try {
      const json = await FetchService.callApi(
        API_URL.USERS.SIGNIN.URL,
        API_URL.USERS.SIGNIN.METHOD,
        user
      );
      let response: IResponse = await json.json();
      if (response.error) {
        return response;
      }
      const data: IReturnDataSignIn = response.data;
      if (!data.access_token || !data.refresh_token) {
        return response;
      }
      AuthService.saveUserTokens({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      });
      return response;
    } catch (err: any) {
      return err;
    }
  }

  //SIGN OUT-----------------------------------------------
  static async signOut(
    access_token: string,
    refresh_token: string
  ): Promise<IResponse> {
    try {
      const json = await FetchService.callApi(
        API_URL.USERS.SIGNOUT.URL,
        API_URL.USERS.SIGNOUT.METHOD,
        { refresh_token },
        {
          Authorization: `Bearer ${access_token}`,
        }
      );
      let response: IResponse = await json.json();
      if (response.error) {
        return response;
      }
      AuthService.removeTokens();
      return response;
    } catch (err: any) {
      return err;
    }
  }

  //TOKEN REFRESH---------------------------------
  static async tokenRefresh(refresh_token: string): Promise<IResponse> {
    try {
      const json = await FetchService.callApi(
        API_URL.USERS.REFRESH_TOKEN.URL,
        API_URL.USERS.REFRESH_TOKEN.METHOD,
        undefined,
        {
          Authorization: `Bearer ${refresh_token}`,
        }
      );
      let response: IResponse = await json.json();
      if (response.error) {
        return response;
      }
      const data: IReturnDataTokenRefresh = response.data;
      if (!data.access_token || !data.refresh_token) {
        return response;
      }
      AuthService.saveUserTokens({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      });
      return response;
    } catch (err: any) {
      return err;
    }
  }
}
