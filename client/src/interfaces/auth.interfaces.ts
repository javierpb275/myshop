//USER
export interface IUser {
  user_id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  phone?: string;
  address?: string;
  created_at: string;
  modified_at: string;
}

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
  login: (email: string, password: string) => void;
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
