import React from "react";
import { toast } from "react-toastify";
import { Box, Avatar } from "@mui/material";
import { stylesType } from "../../utils/styleType";
import { checkImages } from "../../utils/checkImage";

const AvatarUser = ({ avatar, setAvatar }) => {
  const handleInputChange = (e) => {
    const target = e.target;
    const file = target.files;
    if (!file) return;
    if (!checkImages(file[0])) return;
    setAvatar(file[0]);
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
