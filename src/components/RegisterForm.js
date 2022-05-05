import React from "react";
import { TextField, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { validationInput } from "../utils/validateInput";
import { useDispatch } from "react-redux";
import { loading } from "../redux/slice/globalSlice";
import { registerAPI } from "../redux/slice/authSlice";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const PATTERN =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch(loading(true));
    await dispatch(registerAPI(data));
    dispatch(loading(false));
  };

  return (
    <Box
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      width="400px"
      border="1px solid #c4c4c4"
      padding={5}
      borderRadius={5}
    >
      <Box display="flex" flexDirection="column">
        <Typography variant="h4" textAlign="center" mb={2} fontWeight="bold">
          Sign Up
        </Typography>
        <TextField
          name="fullname"
          label="Fullname"
          type="text"
          fullWidth
          error={!!errors.fullname}
          helperText={validationInput("fullname", errors)}
          style={{ marginBottom: "1rem" }}
          {...register("fullname", {
            required: true,
            minLength: 6,
            maxLength: 15,
          })}
        />
        <TextField
          name="username"
          label="Username"
          type="text"
          error={!!errors.username}
          helperText={validationInput("username", errors)}
          fullWidth
          style={{ marginBottom: "1rem" }}
          {...register("username", {
            required: true,
            minLength: 6,
            maxLength: 15,
          })}
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          fullWidth
          error={!!errors.email}
          helperText={validationInput("email", errors)}
          style={{ marginBottom: "1rem" }}
          {...register("email", {
            required: true,
            pattern: PATTERN,
          })}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          fullWidth
          error={!!errors.password}
          helperText={validationInput("password", errors)}
          style={{ marginBottom: "1rem" }}
          {...register("password", {
            required: true,
            minLength: 6,
            maxLength: 15,
          })}
        />

        <Button
          color="primary"
          type="submit"
          variant="contained"
          fullWidth
          mt={2}
        >
          Submit
        </Button>
        <span>
          Are you have an account? <Link to="/login"> Login</Link>
        </span>
      </Box>
    </Box>
  );
};

export default RegisterForm;
