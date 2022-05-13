import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore/lite";
import { toast } from "react-toastify";
import { database } from "../../FireBase";

export const createCollections = async (uid, title, photo) => {
  try {
    const data = {
      uid,
      photo,
      title: title.toLowerCase(),
      createdAt: new Date().toISOString(),
    };
    const res = await addDoc(collection(database, "posts"), data);
    toast.success("Create Post Success!!!");
    return { ...data, id: res.id };
  } catch (error) {
    toast.error(error.message);
  }
};

export const getCollections = async (uid) => {
  try {
    const data = [];
    const num = 10;
    const qry = query(
      collection(database, "posts"),
      where("uid", "==", uid),
      limit(num)
    );

    const querySnapShot = await getDocs(qry);

    querySnapShot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    return data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const updateCollection = async (newData) => {
  try {
    await updateDoc(doc(database, `posts/${newData.id}`), newData);
    toast.success("Update Collections Success!!!");
  } catch (error) {
    toast.error(error.message);
  }
};

export const deleteCollection = async (newData) => {
  try {
    await deleteDoc(doc(database, `posts/${newData.id}`));
  } catch (error) {
    toast.error(error.message);
  }
};
