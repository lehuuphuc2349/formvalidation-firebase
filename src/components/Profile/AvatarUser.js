import React from "react";
import { toast } from "react-toastify";
import { Box, Avatar } from "@mui/material";
import { stylesType } from "../../utils/styleType";

const AvatarUser = ({ avatar, setAvatar }) => {
  const handleInputChange = (e) => {
    const target = e.target;
    const file = target.files;
    if (!file) return;
    checkImages(file[0]);
  };

  const checkImages = (file) => {
    const typeImage = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
    const MAX_SIZE = 1024 * 1024 * 5;
    if (!typeImage.includes(file.type)) {
      toast.error("The image type is png, jpg, gif");
      return;
    }
    if (file.size > MAX_SIZE) {
      toast.error("Maximum file size is 5MB");
      return;
    }
    setAvatar(file);
  };

  const showImage = (avatar) => {
    if (typeof avatar === "string")
      return <Avatar src={avatar} style={stylesType.avatarMedium} />;
    else
      return (
        <Avatar
          src={URL.createObjectURL(avatar)}
          style={stylesType.avatarMedium}
        />
      );
  };

  return (
    <>
      <Box position="relative">
        {avatar ? (
          showImage(avatar)
        ) : (
          <Avatar src={avatar} style={stylesType.avatarMedium} />
        )}
        <input
          type="file"
          accept=".jpg, .png, .gif, .jpeg"
          style={stylesType.absoluteItem}
          onChange={handleInputChange}
        />
      </Box>
    </>
  );
};

export default AvatarUser;
