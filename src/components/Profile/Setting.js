import React, { useState } from "react";
import AvatarUser from "./AvatarUser";
import { TextField, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { loading } from "../../redux/slice/globalSlice";
import { updateProfile } from "../../redux/slice/profileSlice";
import { stylesType } from "../../utils/styleType";
import { useHistory } from "react-router-dom";
import { changeAvatar } from "../../redux/action/profileAction";
import { uploadImage } from "../../redux/action/uploadAction";

const Setting = () => {
  const { profile } = useSelector((state) => state.profile);
  const { currentUser } = useSelector((state) => state.auth);
  const [avatar, setAvatar] = useState(currentUser?.photoURL);
  const [data, setData] = useState(profile);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleChangeAvatar = async () => {
    if (!currentUser || !avatar) return;
    const res = await uploadImage(`images/${currentUser.uid}`, avatar);
    await changeAvatar(currentUser, res[0]);
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    if (!currentUser) return;
    dispatch(loading(true));
    const payload = {
      user: currentUser,
      data,
    };
    await handleChangeAvatar();
    await dispatch(updateProfile(payload));
    dispatch(loading(false));
  };

  return (
    <Box sx={stylesType.container}>
      <Box
        component="form"
        onSubmit={handleSubmitUpdate}
        width="400px"
        border="2px solid #c4c4c4"
        backgroundColor="white"
        padding={5}
        borderRadius={5}
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="h4" textAlign="center" mb={2} fontWeight="bold">
            Setting Profile
          </Typography>
          <AvatarUser avatar={avatar} setAvatar={setAvatar} />
          <TextField
            name="fullname"
            label="Full Name"
            type="text"
            value={data?.fullname}
            onChange={handleChangeInput}
            fullWidth
            style={{ marginBottom: "1rem", marginTop: "1rem" }}
          />
          <TextField
            name="emailContact"
            label="Email Contact"
            type="email"
            value={data?.emailContact}
            onChange={handleChangeInput}
            fullWidth
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            name="phone"
            label="Phone Number"
            value={data?.phone}
            onChange={handleChangeInput}
            type="text"
            fullWidth
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            name="website"
            label="Website"
            value={data?.website}
            onChange={handleChangeInput}
            type="text"
            fullWidth
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            name="address"
            label="Address"
            value={data?.address}
            onChange={handleChangeInput}
            type="text"
            fullWidth
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            name="about"
            label="About"
            value={data?.about}
            onChange={handleChangeInput}
            type="text"
            fullWidth
            style={{ marginBottom: "1rem" }}
          />
          <Button
            color="primary"
            type="submit"
            variant="contained"
            fullWidth
            style={{ height: "60px", marginBottom: "1rem" }}
          >
            Update
          </Button>
          <Button
            color="success"
            variant="contained"
            fullWidth
            style={{ height: "60px" }}
            onClick={() => history.replace("/")}
          >
            Go Back Home
          </Button>
          <br />
        </Box>
      </Box>
    </Box>
  );
};

export default Setting;
