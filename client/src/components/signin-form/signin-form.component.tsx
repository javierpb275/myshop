import React from "react";
import { Link } from "react-router-dom";

export interface ISignInFormComponentProps {}

const SignInFormComponent: React.FunctionComponent<
  ISignInFormComponentProps
> = (props) => {
  return (
    <form>
      <label htmlFor="email">Email: </label>
      <input type="text" id="email" />
      <label htmlFor="password">Password: </label>
      <input type="password" id="password" />
      <button>Sign In</button>
      <Link to="/signup">
      <p>Not having an account yet? Sign Up</p>
      </Link>
    </form>
  );
};

export default SignInFormComponent;
