import { checkImages } from "./checkImage";

export const validatePost = (title, file) => {
  let errMsg = {};

  if (!title.length) errMsg.title = "Please add your title";

  if (!file) {
    errMsg.file = "Please add your photo";
  } else {
    const errImage = checkImages(file);
    if (errImage.errLength > 0) {
      errMsg = { ...errMsg, ...errImage.errMsg };
    }
  }

  return {
    errMsg,
    errLength: Object.keys(errMsg).length,
  };
};
