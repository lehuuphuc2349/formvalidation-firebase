import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const history = useHistory();
  useEffect(() => {
    if (currentUser) history.replace("/");
  }, [currentUser]);
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
