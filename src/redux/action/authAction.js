import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
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
    toast.error(error.message);
  }
};

export const login = async (email, password, remember) => {
  try {
    await setPersistence(
      auth,
      remember ? browserLocalPersistence : browserSessionPersistence
    );
    const res = await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login Success!!!");
    return res.user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const loginGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    toast.success("Login with google success");
    return res.user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const forgotPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success("Success, please check your inbox email");
  } catch (error) {
    toast.error(error.message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    toast.error(error.message);
  }
};
