import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import PostCard from "../Post";

const Posts = () => {
  const { collections } = useSelector((state) => state.posts);

  return (
    <Grid container my={2} spacing={2}>
      {collections.map((collection, index) => (
        <Grid item xs={12} md={6} key={index}>
          <PostCard collection={collection} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
