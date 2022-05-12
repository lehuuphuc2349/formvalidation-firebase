import { toast } from "react-toastify";

export const checkImages = (file) => {
  const typeImage = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
  const MAX_SIZE = 1024 * 1024 * 5;
  if (!typeImage.includes(file.type)) {
    toast.error("The image type is png, jpeg, jpg, gif");
    return;
  }
  if (file.size > MAX_SIZE) {
    toast.error("Maximum file size is 5MB");
    return;
  }
  return true;
};
