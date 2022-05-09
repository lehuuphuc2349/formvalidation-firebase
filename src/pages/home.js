import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!currentUser) return history.replace("/");
  }, [currentUser, history]);

  return <div>home</div>;
};

export default Home;
