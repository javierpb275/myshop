import React from "react";
import SignUpFormComponent from "../../components/signup-form/signup-form.component";

export interface ISignUpPageProps {}

const SignUpPage: React.FunctionComponent<ISignUpPageProps> = (props) => {
  return (
    <div>
      <SignUpFormComponent />
    </div>
  );
};

export default SignUpPage;
