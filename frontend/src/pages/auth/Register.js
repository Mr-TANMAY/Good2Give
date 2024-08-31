import React from "react";
import { Form } from "../../components/Shared/Form/Form";

const Register = () => {
  return (
    <div id="page-container">
      <div id="content-wrap">
        <div className="row">
          <div className="loginForm">
            <Form
              fromTitle={"Register"}
              submitBtn={"Register Now"}
              formType={"Register"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
