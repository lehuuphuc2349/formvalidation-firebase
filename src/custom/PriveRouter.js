import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const PriveRouter = (props) => {
  const { currentUser, waiting } = useSelector((state) => state.auth);
  if (waiting) {
    toast.warning();
  } else {
    return currentUser ? <Route {...props} /> : <Redirect to="/" />;
  }
};
