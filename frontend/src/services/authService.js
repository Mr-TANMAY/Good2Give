import { userLogin, userRegister } from "../redux/features/auth/authAction";
import store from "../redux/store";

// For login services
export const handleLogin = (e, email, password, role) => {
  e.preventDefault();
  try {
    if (!email || !password || !role) {
      alert("Please enter all fields");
      return;
    }
    store.dispatch(userLogin({ email, password, role })); // Corrected dispatch
  } catch (error) {
    console.log(error);
  }
};

//for registration services

export const handleRegister = (
  e,
  role,
  name,
  email,
  password,
  organisationName,
  hotelName,
  stores,
  address,
  phone
) => {
  e.preventDefault();
  try {
    store.dispatch(
      userRegister({
        role,
        name,
        email,
        password,
        organisationName,
        hotelName,
        stores,
        address,
        phone,
      })
    );
  } catch (error) {
    console.log(error);
  }
};
