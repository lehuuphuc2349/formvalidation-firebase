import { doc, getDoc, setDoc } from "firebase/firestore/lite";
import { toast } from "react-toastify";
import { database } from "../../FireBase";

export const changeProfile = async (user, data) => {
  try {
    await setDoc(doc(database, "users", user.uid), data);
    toast.success("Update Profile Success");
    return data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const getProfile = async (uid) => {
  try {
    const docRef = doc(database, `users/${uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (error) {
    toast.error(error.message);
  }
};
