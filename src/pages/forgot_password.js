import React, { useEffect, useState } from "react";
import { TextField, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { toast } from "react-toastify";
import { loading } from "../redux/slice/globalSlice";
import { forgotPassword } from "../redux/action/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { currentUser } = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) history.replace("/");
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.length) {
      toast.error("Please enter your email!!!");
      return;
    }
    dispatch(loading(true));
    await forgotPassword(email);
    dispatch(loading(false));
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        onSubmit={handleSubmit}
        component="form"
        width="400px"
        border="2px solid #c4c4c4"
        padding={5}
        borderRadius={5}
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="h4" textAlign="center" mb={2} fontWeight="bold">
            Forgot Password
          </Typography>
          <TextField
            name="email"
            label="Email"
            type="email"
            fullWidth
            style={{ marginBottom: "1rem" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            color="primary"
            type="submit"
            variant="contained"
            fullWidth
            style={{ height: "60px" }}
          >
            Submit
          </Button>
          <br />
          <Button
            color="success"
            variant="contained"
            fullWidth
            style={{ height: "60px" }}
            onClick={() => goBack()}
          >
            Go Back
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
