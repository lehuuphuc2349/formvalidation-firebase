import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../FireBase";

export const register = async (data) => {
  try {
    const { email, password } = data;
    const res = await createUserWithEmailAndPassword(auth, email, password);
    toast.success("Register success!!!");
    return res.user;
  } catch (error) {
    return toast.error(error.message);
  }
};

export const login = async (data) => {
  try {
  } catch (error) {
    return toast.error(error.message);
  }
};
