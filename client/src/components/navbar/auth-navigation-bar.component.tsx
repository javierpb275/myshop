import React from "react";
import {
  PrimaryNav,
  MenuLink,
  Menu,
  Hamburger,
  NavOption,
} from "./nav.element";
import { useAuthActions, useAuthState } from "../../store/contexts/authContext";

export interface IAuthNavbarComponentProps {}

const AuthNavbarComponent: React.FunctionComponent<
  IAuthNavbarComponentProps
> = (props) => {
  const { user } = useAuthState();
  const { logout } = useAuthActions();
  return (
    <>
      <PrimaryNav>
        <Hamburger />
        {user ? (
          <Menu>
            <NavOption onClick={logout}>Sign Out</NavOption>
            <MenuLink to="/favourites">Favourites</MenuLink>
            <MenuLink to="/checkout">Shopping bag</MenuLink>
          </Menu>
        ) : (
          <Menu>
            <MenuLink to="/signin">Sign In</MenuLink>
            <MenuLink to="/checkout">Shopping bag</MenuLink>
          </Menu>
        )}
      </PrimaryNav>
    </>
  );
};

export default AuthNavbarComponent;
