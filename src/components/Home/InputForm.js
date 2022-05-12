import React, { useState } from "react";
import { Box } from "@mui/system";
import { Button, Input, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { uploadImage } from "../../redux/action/uploadAction";
import { createCollections } from "../../redux/action/postActions";
import { loading } from "../../redux/slice/globalSlice";
import { create } from "../../redux/slice/postSlice";
import { checkImages } from "../../utils/checkImage";

const InputForm = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");

  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;
    if (!title.trim()) return toast.error("Please enter your title");
    if (!file) return toast.error("Please add your photo");

    dispatch(loading(true));
    const url = await uploadImage(`images/${currentUser.uid}`, file);
    const res = await createCollections(currentUser.uid, title, url);
    dispatch(create(res));
    dispatch(loading(false));

    setFile("");
    setTitle("");
  };

  const handleChangeFile = (e) => {
    e.preventDefault();
    const target = e.target;
    const files = target.files;
    if (!files) return;
    if (!checkImages(files[0])) return;
    setFile(files[0]);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      border="1px solid #c4c4c4"
      boxShadow="1px 1px 2px 1px gray"
      padding={2}
      borderRadius={5}
    >
      <Typography variant="h5" textAlign="center" fontWeight="bold">
        CREATE POST
      </Typography>
      <Input
        type="text"
        fullWidth
        placeholder="Title post"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input type="file" color="primary" onChange={handleChangeFile} />
      <Button fullWidth type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
};

export default InputForm;
