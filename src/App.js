import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import { onIdTokenChanged } from "firebase/auth";
import { auth } from "./FireBase";
import { addUser } from "./redux/slice/authSlice";
import { PriveRouter } from "./custom/PriveRouter";
import Login from "./pages/login";
import PageRender from "./custom/PageRender";
import Loading from "./components/Loading";
import Register from "./pages/register";
import ForgotPassword from "./pages/forgot_password";
import Header from "./components/Header";
import Home from "./pages/home";
import { fetchProfile } from "./redux/slice/profileSlice";
import { collectionFetchData } from "./redux/slice/postSlice";

function App() {
  const { currentUser } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.global);

  const dispatch = useDispatch();
  const history = useHistory();

  // This function call when each login, register, logout and reload
  useEffect(() => {
    const subscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        dispatch(addUser(user));
      } else {
        dispatch(addUser(undefined));
        return history.push("/");
      }
    });
    return subscribe;
  }, [dispatch, history]);

  // Fetch Profile User
  useEffect(() => {
    if (!currentUser?.uid) return;
    dispatch(fetchProfile(currentUser.uid));
  }, [currentUser]);

  //Fetch Post User
  useEffect(() => {
    if (!currentUser?.uid) return;
    dispatch(collectionFetchData(currentUser.uid));
  }, [currentUser]);

  return (
    <Router>
      {loading && <Loading />}
      {currentUser && <Header />}
      {/* Public Router */}
      <Route exact path="/" component={currentUser ? Home : Login} />
      <Route exact path="/:page" component={PageRender} />
      <Route exact path="/:page/:id" component={PageRender} />
    </Router>
  );
}

export default App;
