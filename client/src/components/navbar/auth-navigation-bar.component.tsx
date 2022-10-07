import React, { useState } from "react";
import { Link } from "react-router-dom";

export interface IAuthNavbarComponentProps {}

const AuthNavbarComponent: React.FunctionComponent<
  IAuthNavbarComponentProps
> = (props) => {
  const [isAuthorized, setIsAuthorized] = useState(true);
  return (
    <header>
      <nav>
        <ul>
          {isAuthorized ? (
            <li onClick={() => setIsAuthorized(false)}>Sign Out</li>
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
