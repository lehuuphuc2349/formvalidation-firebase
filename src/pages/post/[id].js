import React from "react";
import PostDetailContent from "../../components/Post/PostDetail";
import InputForm from "../../components/Home/InputForm";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";

const PostDetail = () => {
  const { dataUpdate } = useSelector((state) => state.posts);
  return (
    <Container maxWidth="lg" style={{ marginTop: "1rem" }}>
      {dataUpdate && <InputForm />}
      <PostDetailContent />
    </Container>
  );
};

export default PostDetail;
