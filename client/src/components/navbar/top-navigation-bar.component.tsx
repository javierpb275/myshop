import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./topnav.module.css";

export interface ITopNavbarComponentProps {}

const TopNavbarComponent: React.FunctionComponent<ITopNavbarComponentProps> = (
  props
) => {
  const navigate = useNavigate();
  const searchFor = (category: string) => {
    navigate(`/products/${category}`);
    window.location.reload();
  };
  return (
    <div>
      <div className={classes.dropdown}>
        <button className={classes.dropbtn} onClick={() => searchFor("me-")}>
          Men
        </button>
        <div className={classes.dropdownContent}>
          <p onClick={() => searchFor("me-sh-")}>Shoes</p>
          <p onClick={() => searchFor("me-ja-")}>Jackets</p>
          <p onClick={() => searchFor("me-ts-")}>T-Shirts</p>
          <p onClick={() => searchFor("me-tr-")}>Trousers</p>
        </div>
      </div>
      <div className={classes.dropdown}>
        <button className={classes.dropbtn} onClick={() => searchFor("wm-")}>
          Women
        </button>
        <div className={classes.dropdownContent}>
          <p onClick={() => searchFor("wm-sh-")}>Shoes</p>
          <p onClick={() => searchFor("wm-ja-")}>Jackets</p>
          <p onClick={() => searchFor("wm-ts-")}>T-Shirts</p>
          <p onClick={() => searchFor("wm-tr-")}>Trousers</p>
        </div>
      </div>
      <div className={classes.dropdown}>
        <button className={classes.dropbtn} onClick={() => searchFor("ch-")}>
          Children
        </button>
        <div className={classes.dropdownContent}>
          <p onClick={() => searchFor("ch-sh-")}>Shoes</p>
          <p onClick={() => searchFor("ch-ja-")}>Jackets</p>
          <p onClick={() => searchFor("ch-ts-")}>T-Shirts</p>
          <p onClick={() => searchFor("ch-tr-")}>Trousers</p>
        </div>
      </div>
    </div>
  );
};

export default TopNavbarComponent;
