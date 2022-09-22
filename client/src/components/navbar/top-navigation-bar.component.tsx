import React from "react";

export interface ITopNavbarComponentProps {}

const TopNavbarComponent: React.FunctionComponent<ITopNavbarComponentProps> = (
  props
) => {
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

export default TopNavbarComponent;
