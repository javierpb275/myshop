import React from "react";

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
    </form>
  );
};

export default SignInFormComponent;
