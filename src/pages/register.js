import { Box } from "@mui/system";
import React from "react";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
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
      <RegisterForm />
    </Box>
  );
};

export default Register;
