import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { AuthService } from "../../services/authService";
import { IBodySignIn, IBodySignUp, Tokens } from "../../services/serviceTypes";
import {
  IAuthContext,
  AuthActionType,
  AuthAction,
  IAuthState,
} from "./contextsTypes";

// initial state for the useReducer hook
const initialState: IAuthState = {
  user: null,
  initialLoading: false,
  isLoggingIn: false,
  loginError: "",
};

// initial value for the auth context
const initialContext: IAuthContext = {
  state: {
    user: null,
    initialLoading: false,
    isLoggingIn: false,
    loginError: "",
  },
  actions: {
    register: () => undefined,
    login: () => undefined,
    logout: () => undefined,
  },
};

// reducer function for returning the appropriate state after
// a pre-defined action is dispatched
const reducer = (state: IAuthState, action: AuthAction): IAuthState => {
  const { type, payload } = action;
  switch (type) {
    case AuthActionType.INIT_FETCH_USER_DATA:
      return {
        ...state,
        initialLoading: true,
      };

    case AuthActionType.FETCH_USER_DATA_SUCCESSFUL:
      return {
        ...state,
        initialLoading: false,
        user: payload?.user,
      };

    case AuthActionType.FETCH_USER_DATA_FAILED:
      return {
        ...state,
        initialLoading: false,
        user: null,
      };

    case AuthActionType.INIT_LOGIN:
      return {
        ...state,
        isLoggingIn: true,
      };

    case AuthActionType.LOGIN_SUCCESSFUL:
      return {
        ...state,
        user: payload?.user,
        isLoggingIn: false,
        loginError: "",
      };

    case AuthActionType.LOGIN_FAILED:
      return {
        ...state,
        user: null,
        isLoggingIn: false,
        loginError: payload?.error as string,
      };

    case AuthActionType.LOGOUT:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

const AuthContext = createContext<IAuthContext>(initialContext);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // fetch the data of a user on initial page load
  // to restore their session if there's an access_token and a refresh_token
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const isAuthenticated = await AuthService.checkAuthentication();
        if (isAuthenticated) {
          dispatch({ type: AuthActionType.INIT_FETCH_USER_DATA });
          const response = await AuthService.getProfile(
            localStorage.getItem(Tokens.ACCESS_TOKEN)!
          );
          if (response && !response.error) {
            dispatch({
              type: AuthActionType.FETCH_USER_DATA_SUCCESSFUL,
              payload: { user: response.data.user },
            });
          } else {
            dispatch({
              type: AuthActionType.FETCH_USER_DATA_FAILED,
            });
          }
        }
      } catch (error: Error | any) {
        dispatch({
          type: AuthActionType.FETCH_USER_DATA_FAILED,
        });
      }
    };

    fetchUserData();
  }, []);

  // used the useCallback hook to prevent the function from being recreated after a re-render
  const register = useCallback(async (userRegister: IBodySignUp) => {
    try {
      dispatch({ type: AuthActionType.INIT_LOGIN });
      const response = await AuthService.signUp(userRegister);
      if (response && !response.error) {
        // complete a successful login process
        dispatch({
          type: AuthActionType.LOGIN_SUCCESSFUL,
          payload: { user: response.data.user },
        });
        // go to the home page
        window.location.href = "/";
      } else {
        dispatch({
          type: AuthActionType.LOGIN_FAILED,
          payload: { error: response.data.message },
        });
      }
    } catch (error: Error | any) {
      dispatch({
        type: AuthActionType.LOGIN_FAILED,
        payload: { error: error.data.message || "Register failed" },
      });
    }
  }, []);

  // used the useCallback hook to prevent the function from being recreated after a re-render
  const login = useCallback(async (userLogin: IBodySignIn) => {
    try {
      dispatch({ type: AuthActionType.INIT_LOGIN });
      const response = await AuthService.signIn(userLogin);
      if (response && !response.error) {
        // complete a successful login process
        dispatch({
          type: AuthActionType.LOGIN_SUCCESSFUL,
          payload: { user: response.data.user },
        });
        // go to the home page
        window.location.href = "/";
      } else {
        dispatch({
          type: AuthActionType.LOGIN_FAILED,
          payload: { error: response.data.message },
        });
      }
    } catch (error: Error | any) {
      dispatch({
        type: AuthActionType.LOGIN_FAILED,
        payload: { error: error.data.message || "Login failed" },
      });
    }
  }, []);

  // used the useCallback hook to prevent the function from being recreated after a re-render
  const logout = useCallback(async () => {
    try {
      const isAuthenticated = await AuthService.checkAuthentication();
      if (isAuthenticated) {
        AuthService.signOut(
          localStorage.getItem(Tokens.ACCESS_TOKEN)!,
          localStorage.getItem(Tokens.REFRESH_TOKEN)!
        );
      }
      localStorage.removeItem(Tokens.ACCESS_TOKEN);
      localStorage.removeItem(Tokens.REFRESH_TOKEN);
      dispatch({ type: AuthActionType.LOGOUT });
    } catch (error) {
      localStorage.removeItem(Tokens.ACCESS_TOKEN);
      localStorage.removeItem(Tokens.REFRESH_TOKEN);
      dispatch({ type: AuthActionType.LOGOUT });
    }
  }, []);

  // stored the auth context value in useMemo hook to recalculate
  // the value only when necessary
  const value = useMemo(
    () => ({ state, actions: { register, login, logout } }),
    [register, login, logout, state]
  );
  return (
    <AuthContext.Provider value={value}>
      {state.initialLoading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

// hook for accessing the auth state
export const useAuthState = () => {
  const { state } = useContext(AuthContext);
  return state;
};
// hook for accessing the auth actions
export const useAuthActions = () => {
  const { actions } = useContext(AuthContext);
  return actions;
};

export default AuthProvider;
