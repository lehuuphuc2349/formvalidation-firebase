import React, { useState } from "react";
import { TextField, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loading } from "../redux/slice/globalSlice";
import { loginAPI } from "../redux/slice/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const hanldeSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill in your detail");
    dispatch(loading(true));
    const data = {
      email: email,
      password: password,
    };
    await dispatch(loginAPI(data));
    dispatch(loading(false));
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
        onSubmit={hanldeSubmit}
        component="form"
        width="400px"
        border="1px solid #c4c4c4"
        padding={5}
        borderRadius={5}
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="h4" textAlign="center" mb={2} fontWeight="bold">
            Sign In
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
          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            style={{ marginBottom: "1rem" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            color="primary"
            type="submit"
            variant="contained"
            fullWidth
            mt={2}
            mb={2}
          >
            Submit
          </Button>
          <span>
            Do not have an account? <Link to="/register"> Register</Link>
          </span>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;