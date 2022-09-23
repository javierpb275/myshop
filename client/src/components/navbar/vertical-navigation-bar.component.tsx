import React from "react";

export interface IVerticalNavbarComponentProps {}

const VerticalNavbarComponent: React.FunctionComponent<
  IVerticalNavbarComponentProps
> = (props) => {
  return (
    <header>
      <nav>
        <ul>
          <li>Women</li>
          <li>Men</li>
          <li>Unisex</li>
        </ul>
      </nav>
    </header>
  );
};

export default VerticalNavbarComponent;
