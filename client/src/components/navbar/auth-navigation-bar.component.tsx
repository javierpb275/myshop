import React from "react";
import { Link } from "react-router-dom";
import { useAuthActions, useAuthState } from "../../store/contexts/authContext";

export interface IAuthNavbarComponentProps {}

const AuthNavbarComponent: React.FunctionComponent<
  IAuthNavbarComponentProps
> = (props) => {
  const { user } = useAuthState();
  const { logout } = useAuthActions();
  return (
    <header>
      <nav>
        <ul>
          {user ? (
            <li onClick={logout}>Sign Out</li>
          ) : (
            <Link to="/signin">
              <li>Sign In</li>
            </Link>
          )}
          <li>Favourites</li>
          <li>Shopping bag</li>
        </ul>
      </nav>
    </header>
  );
};

export default AuthNavbarComponent;
