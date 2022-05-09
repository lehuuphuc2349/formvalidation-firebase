import React, { useEffect, useState } from "react";
import {
  TextField,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loading } from "../redux/slice/globalSlice";
import { loginAPI } from "../redux/slice/authSlice";
import { loginGoogle } from "../redux/action/authAction";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) history.replace("/home");
  }, [currentUser]);

  const hanldeSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill in your detail");
    dispatch(loading(true));
    const data = {
      email,
      password,
      remember,
    };
    await dispatch(loginAPI(data));
    dispatch(loading(false));
  };

  const handleLoginWithGoogle = async () => {
    dispatch(loading(true));
    await loginGoogle();
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
        border="2px solid #c4c4c4"
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
            style={{ height: "60px" }}
          >
            Submit
          </Button>
          <br />
          <Button
            color="error"
            variant="contained"
            fullWidth
            style={{ height: "60px" }}
            onClick={() => handleLoginWithGoogle()}
          >
            Google
          </Button>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <FormControlLabel
              control={
                <Checkbox
                  value={remember}
                  onChange={() => setRemember(!remember)}
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Link to="/forgot_password">
              <span>Forgot Password</span>
            </Link>
          </Box>
          <span>
            Do not have an account? <Link to="/register"> Register</Link>
          </span>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
