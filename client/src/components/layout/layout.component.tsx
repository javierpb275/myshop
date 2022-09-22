import React from "react";
import { Outlet } from "react-router-dom";
import TopNavbarComponent from "../navbar/top-navigation-bar.component";

export interface ILayoutComponentProps {}

const LayoutComponent: React.FunctionComponent<ILayoutComponentProps> = (
  props
) => {
  return (
    <div>
      <TopNavbarComponent />
      <Outlet />
    </div>
  );
};

export default LayoutComponent;
