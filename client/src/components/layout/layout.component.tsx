import React from "react";
import { Link, Outlet } from "react-router-dom";
import CustomImageComponent from "../custom-img/custom-image.component";
import FooterComponent from "../footer/footer.component";
import AuthNavbarComponent from "../navbar/auth-navigation-bar.component";
import TopNavbarComponent from "../navbar/top-navigation-bar.component";

export interface ILayoutComponentProps {}

const LayoutComponent: React.FunctionComponent<ILayoutComponentProps> = (
  props
) => {
  return (
    <div>
      <AuthNavbarComponent />
      <Link to="/">
        <CustomImageComponent
          src="./logos/myshop-logo-64.png"
          alt="myshop-logo"
        />
      </Link>
      <TopNavbarComponent />
      <Outlet />
      <FooterComponent />
    </div>
  );
};

export default LayoutComponent;
