import React from "react";
import SignInFormComponent from "../../components/signin-form/signin-form.component";

export interface ISignInPageProps {}

const SignInPage: React.FunctionComponent<ISignInPageProps> = (props) => {
  return (
    <div>
      <SignInFormComponent />
    </div>
  );
};

export default SignInPage;
