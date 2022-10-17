import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./topnav.module.css";

export interface ITopNavbarComponentProps {}

const TopNavbarComponent: React.FunctionComponent<ITopNavbarComponentProps> = (
  props
) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className={classes.dropdown}>
        <button
          className={classes.dropbtn}
          onClick={() => navigate("/products/me-")}
        >
          Men
        </button>
        <div className={classes.dropdownContent}>
          <p onClick={() => navigate("/products/me-sh-")}>Shoes</p>
          <p onClick={() => navigate("/products/me-ja-")}>Jackets</p>
          <p onClick={() => navigate("/products/me-ts-")}>T-Shirts</p>
          <p onClick={() => navigate("/products/me-tr-")}>Trousers</p>
        </div>
      </div>
      <div className={classes.dropdown}>
        <button
          className={classes.dropbtn}
          onClick={() => navigate("/products/wm-")}
        >
          Women
        </button>
        <div className={classes.dropdownContent}>
          <p onClick={() => navigate("/products/wm-sh-")}>Shoes</p>
          <p onClick={() => navigate("/products/wm-ja-")}>Jackets</p>
          <p onClick={() => navigate("/products/wm-ts-")}>T-Shirts</p>
          <p onClick={() => navigate("/products/wm-tr-")}>Trousers</p>
        </div>
      </div>
      <div className={classes.dropdown}>
        <button
          className={classes.dropbtn}
          onClick={() => navigate("/products/ch-")}
        >
          Children
        </button>
        <div className={classes.dropdownContent}>
          <p onClick={() => navigate("/products/ch-sh-")}>Shoes</p>
          <p onClick={() => navigate("/products/ch-ja-")}>Jackets</p>
          <p onClick={() => navigate("/products/ch-ts-")}>T-Shirts</p>
          <p onClick={() => navigate("/products/ch-tr-")}>Trousers</p>
        </div>
      </div>
    </div>
  );
};

export default TopNavbarComponent;
