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
import { useSelector } from "react-redux";
import MoreVerItem from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import moment from "moment";
import { DeleteForever, DeleteOutlineOutlined } from "@mui/icons-material";

const PostCard = ({ collection }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDeletePost = () => {
    handleCloseUserMenu();
  };

  const handleUpdatePost = () => {
    handleCloseUserMenu();
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
        <Typography mb={2} textTransform="capitalize">
          {collection?.title}
        </Typography>
        <CardMedia
          component="img"
          height={400}
          width="100%"
          image={collection.photo[0]}
          title="title"
        />
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
