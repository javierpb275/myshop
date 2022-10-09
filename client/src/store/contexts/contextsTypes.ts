import { IUser } from "../../interfaces/user.interface";
import { IBodySignIn, IBodySignUp } from "../../services/serviceTypes";

//AUTH CONTEXT
export interface IAuthContext {
  state: IAuthState;
  actions: IAuthAction;
}

export interface IAuthState {
  user: IUser | null | undefined;
  initialLoading: boolean;
  isLoggingIn: boolean;
  loginError: string;
}

export interface IAuthAction {
  register: (user: IBodySignUp) => void;
  login: (user: IBodySignIn) => void;
  logout: () => void;
}

export enum AuthActionType {
  INIT_LOGIN = "INIT_LOGIN",
  LOGIN_SUCCESSFUL = "LOGIN_SUCCESSFUL",
  LOGIN_FAILED = "LOGIN_FAILED",
  INIT_FETCH_USER_DATA = "INIT_FETCH_USER_DATA",
  FETCH_USER_DATA_SUCCESSFUL = "FETCH_USER_DATA_SUCCESSFUL",
  FETCH_USER_DATA_FAILED = "FETCH_USER_DATA_FAILED",
  LOGOUT = "LOGOUT",
}

export interface AuthAction {
  type: AuthActionType;
  payload?: {
    user?: IUser;
    error?: string;
  };
}
