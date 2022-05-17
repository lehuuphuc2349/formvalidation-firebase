import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { stylesType } from "../../utils/styleType";
import { setUpdateData } from "../../redux/slice/postSlice";
import { getCollection } from "../../redux/action/postActions";
import { useParams } from "react-router-dom";
import PostCard from ".";

const PostDetailContent = () => {
  const { id } = useParams();
  const { collections } = useSelector((state) => state.posts);
  const [collection, setCollection] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;
    const collectionItem = collections.find((item) => item.id === id);
    if (collectionItem) {
      setCollection(collectionItem);
    } else {
      getCollection(id).then((res) => setCollection(res));
    }
    return () => {
      dispatch(setUpdateData(undefined));
    };
  }, [id, collections, dispatch]);

  return (
    <Box style={stylesType.containerDetail}>
      <Box width={800} height={800}>
        <PostCard collection={collection} />
      </Box>
    </Box>
  );
};

export default PostDetailContent;
