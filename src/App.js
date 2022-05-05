import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import { PageRender } from "./custom/PageRender";
import Home from "./pages/home";

function App() {
  const { loading } = useSelector((state) => state.global);
  return (
    <>
      {loading && <Loading />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:page" element={<PageRender />} />
        <Route path="/:page/:id" element={<PageRender />} />
      </Routes>
    </>
  );
}

export default App;
