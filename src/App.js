import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { PageRender } from "./custom/PageRender";
import Home from "./pages/home";
import Login from "./pages/login";
import Loading from "./components/Loading";

function App() {
  const { loading } = useSelector((state) => state.global);
  const { currrentUser } = useSelector((state) => state.auth);

  return (
    <>
      {loading && <Loading />}
      <Routes>
        <Route path="/" element={currrentUser ? <Home /> : <Login />} />
        <Route path="/:page" element={<PageRender />} />
        <Route path="/:page/:id" element={<PageRender />} />
      </Routes>
    </>
  );
}

export default App;
