import React from "react";
import { Link } from "react-router-dom";

export interface IAuthNavbarComponentProps {}

const AuthNavbarComponent: React.FunctionComponent<
  IAuthNavbarComponentProps
> = (props) => {
  return (
    <header>
      <nav>
        <ul>
          <Link to="/signin">
            <li>Sign In</li>
          </Link>
          <li>Favourites</li>
          <li>Shopping bag</li>
        </ul>
      </nav>
    </header>
  );
};

export default AuthNavbarComponent;
