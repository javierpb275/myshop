import React from "react";

export interface ITopNavbarComponentProps {}

const TopNavbarComponent: React.FunctionComponent<ITopNavbarComponentProps> = (
  props
) => {
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

export default TopNavbarComponent;
