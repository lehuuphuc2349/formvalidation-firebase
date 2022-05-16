import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  CardActions,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MoreVerItem from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import moment from "moment";
import { remove, setUpdateData } from "../../redux/slice/postSlice";
import { deleteCollection } from "../../redux/action/postActions";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const PostCard = ({ collection }) => {
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.auth);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDeletePost = async () => {
    if (window.confirm("Are you sure want to delete this post ?")) {
      dispatch(remove(collection));
      toast.success("Delete Post Success!!!");
      await deleteCollection(collection);
      return;
    }
    setAnchorElUser(null);
  };

  const handleUpdatePost = () => {
    dispatch(setUpdateData(collection));
    window.scroll({ behavior: "smooth", top: 0 });
  };

  const handleLikePost = () => {};

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={currentUser?.photoURL} />}
        title={currentUser.displayName ? currentUser.displayName : "Anonymus"}
        subheader={moment(collection.createdAt).format("HH:MM MMM DD,YYYY")}
        action={
          <IconButton onClick={handleOpenUserMenu}>
            <MoreVerItem />
          </IconButton>
        }
      />

      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleUpdatePost}>
          <Typography textAlign="center">Update Post</Typography>
        </MenuItem>
        <MenuItem onClick={handleDeletePost}>
          <Typography textAlign="center">Delete Post</Typography>
        </MenuItem>
      </Menu>

      <CardContent>
        {id ? (
          <>
            <Typography mb={2} textTransform="capitalize">
              {collection?.title}
            </Typography>
            <CardMedia
              component="img"
              height={600}
              width="100%"
              image={collection?.photo?.[0] ? collection?.photo?.[0] : ""}
              title="title"
            />
          </>
        ) : (
          <Link to={`post/${collection.id}`}>
            <Typography mb={2} textTransform="capitalize">
              {collection?.title}
            </Typography>
            <CardMedia
              component="img"
              height={600}
              width="100%"
              image={collection?.photo?.[0] ? collection?.photo?.[0] : ""}
              title="title"
            />
          </Link>
        )}
      </CardContent>
      <CardActions>
        <IconButton onClick={handleLikePost}>
          <FavoriteIcon color="secondary" />
        </IconButton>
        <Typography component="span">100 likes</Typography>
      </CardActions>
    </Card>
  );
};

export default PostCard;
