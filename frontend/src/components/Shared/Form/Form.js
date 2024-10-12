import React, { useState } from "react";
import InputType from "./InputType";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin, userRegister } from "../../../redux/features/auth/authAction";
import { toast } from "react-toastify"; // Import react-toastify for toast messages

export const Form = ({ formType, submitBtn, fromTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [storeName, setStore] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation for required fields
    if (!email) {
      toast.error("Please provide an email");
      return;
    }

    if (!password) {
      toast.error("Please provide a password");
      return;
    }

    if (formType === "Register") {
      if (role === "organisation" && !organisationName) {
        toast.error("Please provide an organisation name");
        return;
      }

      if (role === "hotel" && !hotelName) {
        toast.error("Please provide a hotel name");
        return;
      }

      if (role === "stores" && !storeName) {
        toast.error("Please provide a store name");
        return;
      }

      if (!address) {
        toast.error("Please provide an address");
        return;
      }

      if (!phone) {
        toast.error("Please provide a phone number");
        return;
      }
    }

    // If formType is Login, proceed with login request
    if (formType === "Login") {
      await dispatch(userLogin({ email, password, role }));
    } 
    // If formType is Register, proceed with registration request
    else if (formType === "Register") {
      await dispatch(userRegister({
        role,
        name,
        email,
        password,
        organisationName,
        hotelName,
        storeName,
        address,
        phone,
      }));
      
      // Navigate to login only after successful registration
      navigate("/login");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-center">{fromTitle}</h1>
        <hr />
        <div className="d-flex">
          {["admin", "user", "organisation", "hotel", "stores"].map((roleValue) => (
            <div className="form-check" key={roleValue}>
              <input
                type="radio"
                className="form-check-input"
                name="role"
                value={roleValue}
                id={`${roleValue}Radio`}
                checked={role === roleValue}
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor={`${roleValue}Radio`} className="form-check-label">
                {roleValue.charAt(0).toUpperCase() + roleValue.slice(1)}
              </label>
            </div>
          ))}
        </div>

        {formType === "Login" ? (
          <>
            <InputType
              labelText={"Email"}
              labelFor={"forEmail"}
              inputType={"email"}
              name={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputType
              labelText={"Password"}
              labelFor={"forPassword"}
              inputType={"password"}
              name={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        ) : (
          <>
            {(role === "admin" || role === "user") && (
              <InputType
                labelText={"Name"}
                labelFor={"forName"}
                inputType={"text"}
                name={"name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            {role === "organisation" && (
              <InputType
                labelText={"Organisation Name"}
                labelFor={"forOrganisationName"}
                inputType={"text"}
                name={"organisationName"}
                value={organisationName}
                onChange={(e) => setOrganisationName(e.target.value)}
              />
            )}
            {role === "hotel" && (
              <InputType
                labelText={"Hotel Name"}
                labelFor={"forHotelName"}
                inputType={"text"}
                name={"hotelName"}
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
              />
            )}
            {role === "stores" && (
              <InputType
                labelText={"Store Name"}
                labelFor={"forStoreName"}
                inputType={"text"}
                name={"storeName"}
                value={storeName}
                onChange={(e) => setStore(e.target.value)}
              />
            )}
            <InputType
              labelText={"Email"}
              labelFor={"forEmail"}
              inputType={"email"}
              name={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputType
              labelText={"Password"}
              labelFor={"forPassword"}
              inputType={"password"}
              name={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputType
              labelText={"Address"}
              labelFor={"forAddress"}
              inputType={"text"}
              name={"address"}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <InputType
              labelText={"Phone"}
              labelFor={"forPhone"}
              inputType={"text"}
              name={"phone"}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </>
        )}

        <div className="d-flex flex-column justify-content-between">
          {formType === "Login" ? (
            <p>
              Not Registered yet? Register
              <Link to={"/register"}> Here!</Link>
            </p>
          ) : (
            <p>
              Already Registered?<Link to={"/login"}> Login Now!</Link>
            </p>
          )}
          <button type="submit" className="btn btn-success btn-lg text-light mt-2">
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};
