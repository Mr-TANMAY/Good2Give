import { userLogin, userRegister } from "../redux/features/auth/authAction";
import store from "../redux/store";
import { toast } from "react-toastify";

export const handleLogin = (e, email, password, role) => {
    e.preventDefault();
    try {
      if (!role || !email || !password) {
        return toast.error("Please provide all fields");
      }
      store.dispatch(userLogin({ email, password, role }));
    } catch (error) {
      console.log(error);
    }
  };
  

export const handleRegister = (
  e,
  role,
  name,
  email,
  password,
  organisationName,
  hotelName,
  storeName,
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
        storeName,
        address,
        phone,
      })
    );
  } catch (error) {
    console.log(error);
  }
};
