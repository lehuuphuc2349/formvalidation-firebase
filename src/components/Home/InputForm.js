import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../redux/action/uploadAction";
import {
  createCollections,
  updateCollection,
} from "../../redux/action/postActions";
import { alertMessage, loading } from "../../redux/slice/globalSlice";
import { create, setUpdateData, update } from "../../redux/slice/postSlice";
import { validatePost } from "../../utils/validatePost";

const InputForm = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");

  const { dataUpdate } = useSelector((state) => state.posts);
  const { currentUser } = useSelector((state) => state.auth);
  const { alert } = useSelector((state) => state.global);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;
    const check = validatePost(title, file);
    if (check.errLength > 0) {
      dispatch(alertMessage(check.errMsg));
      return;
    }

    dispatch(loading(true));
    const url = await uploadImage(`images/${currentUser.uid}`, file);

    if (dataUpdate) {
      const newData = { ...dataUpdate, title, photo: url };
      dispatch(update(newData));
      await updateCollection(newData);
    } else {
      const res = await createCollections(currentUser.uid, title, url);
      dispatch(create(res));
    }

    dispatch(loading(false));
    dispatch(alertMessage({}));
    setFile("");
    setTitle("");
  };

  useEffect(() => {
    if (!dataUpdate) return;
    if (dataUpdate.title) setTitle(dataUpdate.title);
    return () => {
      dispatch(setUpdateData(undefined));
    };
  }, [dataUpdate, dispatch]);

  const handleCancelEdit = () => {
    dispatch(setUpdateData(undefined));
    setFile("");
    setTitle("");
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
        {dataUpdate ? "EDIT POST" : "CREATE POST"}
      </Typography>
      <TextField
        type="text"
        fullWidth
        placeholder="Title post"
        value={title}
        error={!!alert.title}
        helperText={alert.title ? alert.title : ""}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: "8px" }}
      />

      <TextField
        type="file"
        error={!!alert.file}
        helperText={alert.file ? alert.file : ""}
        color="primary"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <Button
        fullWidth
        type="submit"
        variant="contained"
        style={{ margin: "1rem 0" }}
      >
        Submit
      </Button>
      {dataUpdate && (
        <Button
          fullWidth
          variant="contained"
          color="error"
          onClick={() => handleCancelEdit()}
        >
          Cancel
        </Button>
      )}
    </Box>
  );
};

export default InputForm;
