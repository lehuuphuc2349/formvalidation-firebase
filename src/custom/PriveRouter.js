import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const PriveRouter = (props) => {
  const { currentUser } = useSelector((state) => state.auth);
  return currentUser ? <Route {...props} /> : <Redirect to="/" />;
};
