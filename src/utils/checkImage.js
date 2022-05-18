export const checkImages = (file) => {
  let errMsg = {};
  const typeImage = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
  const MAX_SIZE = 1024 * 1024 * 5;
  if (file.size > MAX_SIZE) {
    errMsg.file = "Maximum file size is 5MB";
  }
  if (!typeImage.includes(file.type)) {
    errMsg.file = "The image type is png, jpeg, jpg, gif";
  }
  return {
    errMsg,
    errLength: Object.keys(errMsg).length,
  };
};
