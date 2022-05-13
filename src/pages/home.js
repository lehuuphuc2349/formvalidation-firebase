import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import InputForm from "../components/Home/InputForm";
import Posts from "../components/Home/Posts";

const Home = () => {
  const history = useHistory();
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!currentUser) return history.replace("/");
  }, [currentUser, history]);

  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      <InputForm />
      <Posts />
    </Container>
  );
};

export default Home;
