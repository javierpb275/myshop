import React from "react";

export interface ISignUpFormComponentProps {}

const SignUpFormComponent: React.FunctionComponent<
  ISignUpFormComponentProps
> = (props) => {
  return (
    <form>
      <label htmlFor="username">Username: </label>
      <input type="text" id="username" />
      <label htmlFor="email">Email: </label>
      <input type="text" id="email" />
      <label htmlFor="password">Password: </label>
      <input type="password" id="password" />
      <label htmlFor="repeat_password">Repeat Password: </label>
      <input type="password" id="repeat_password" />
      <input
        type="checkbox"
        id="terms_conditions"
        name="terms_conditions"
        value="true"
      />
      <label htmlFor="terms_conditions">Accept terms and conditions</label>
      <button>Sign Up</button>
    </form>
  );
};

export default SignUpFormComponent;
