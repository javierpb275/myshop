import { ITokenData, Tokens } from "./serviceTypes";

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
}
