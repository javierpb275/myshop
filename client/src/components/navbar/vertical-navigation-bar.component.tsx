import React from "react";

export interface IVerticalNavbarComponentProps {}

const VerticalNavbarComponent: React.FunctionComponent<
  IVerticalNavbarComponentProps
> = (props) => {
  return (
    <header>
      <nav>
        <ul>
          <li>Home</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  );
};

export default VerticalNavbarComponent;
