import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth, googleProvider } from "../../FireBase";

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

export const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login Success!!!");
    return res.user;
  } catch (error) {
    return toast.error(error.message);
  }
};

export const loginGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    return toast.success("Login with google success");
  } catch (error) {
    return toast.error(error.message);
  }
};
