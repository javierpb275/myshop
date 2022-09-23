import React from "react";
import { Link } from "react-router-dom";

export interface IFooterComponentProps {}

const FooterComponent: React.FunctionComponent<IFooterComponentProps> = (
  props
) => {
  return (
    <footer>
      <ul>
        <Link to="/contact">
          <li>Contact</li>
        </Link>
      </ul>
    </footer>
  );
};

export default FooterComponent;
