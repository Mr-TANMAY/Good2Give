import React from "react";
import "./Login.css"; // Existing CSS
import { Form } from "../../components/Shared/Form/Form";

const Login = () => {
  return (
    <div id="page-container">
      <div id="content-wrap">
        <div className="row">
          <div className="loginForm">
            <Form
              fromTitle={"Login Account"}
              submitBtn={"Login"}
              formType={"Login"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
