import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { storage } from "../../FireBase";

export const uploadImage = async (folder, file) => {
  try {
    const promises = [];
    const storageRef = ref(storage, `${folder}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    promises.push(uploadTask);

    const result = [];
    await Promise.allSettled(promises).then((res) => {
      res.forEach((item) => {
        if (item.status === "fulfilled") {
          result.push(item.value);
        }
      });
    });

    const urlsImage = getURLImages(result);

    return urlsImage;
  } catch (error) {
    toast.error(error.message);
  }
};

export const getURLImages = async (resultItemUploadTask) => {
  const urlsImage = [];

  const urlPromises = resultItemUploadTask.map((item) => {
    const path = item.ref.toString();
    return getDownloadURL(ref(storage, path));
  });

  await Promise.allSettled(urlPromises).then((res) => {
    res.forEach((item) => {
      if (item.status === "fulfilled") {
        urlsImage.push(item.value);
      }
    });
  });

  return urlsImage;
};
