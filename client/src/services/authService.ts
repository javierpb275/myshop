import { API_URL } from "../config/constants";
import { FetchService } from "./fetchService";
import {
  IBodySignIn,
  IBodySignUp,
  IPayload,
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

  //CHECK IF TOKEN IS ABOUT TO EXPIRE AND MUST BE REFRESHED-----------
  static checkIfRefreshToken(expiration: number): boolean {
    const maxExpirationMinutesBeforeRefresh: number = 10;
    const expirationInMs: number = expiration * 1000;
    const expirationDate: any = new Date(expirationInMs);
    const currentDate: any = new Date();
    const renew: boolean =
      (expirationDate - currentDate) / 1000 / 60 <
      maxExpirationMinutesBeforeRefresh;
    return renew;
  }

  //GET PAYLOAD FROM TOKEN-------------------------------------
  static getPayload(token: string): IPayload | undefined | null {
    const payload = JSON.parse(atob(token.split(".")[1])) as IPayload;
    if (
      !payload ||
      !payload.exp ||
      !payload.iat ||
      !payload.jti ||
      !payload.nbf ||
      !payload.sub ||
      !payload.type
    ) {
      return null;
    }
    return payload;
  }

  // CHECK AUTHENTICATION-----------------------------
  static async checkAuthentication(): Promise<boolean> {
    let access_token = localStorage.getItem(Tokens.ACCESS_TOKEN);
    let refresh_token = localStorage.getItem(Tokens.REFRESH_TOKEN);
    if (!access_token || !refresh_token) {
      AuthService.removeTokens();
      return false;
    }
    const access_token_payload = AuthService.getPayload(access_token);
    const refresh_token_payload = AuthService.getPayload(refresh_token);
    if (!access_token_payload || !refresh_token_payload) {
      AuthService.removeTokens();
      return false;
    }
    if (
      refresh_token_payload.type !== "refresh" ||
      access_token_payload.type !== "access"
    ) {
      AuthService.removeTokens();
      return false;
    }
    const tokenMustBeRefreshed = AuthService.checkIfRefreshToken(
      access_token_payload.exp
    );
    try {
      if (tokenMustBeRefreshed) {
        const tokenRefreshResponse = await AuthService.tokenRefresh(
          refresh_token
        );
        if (tokenRefreshResponse.error) {
          AuthService.removeTokens();
          return false;
        }
      }
      return true;
    } catch (err) {
      AuthService.removeTokens();
      return false;
    }
  }
}
