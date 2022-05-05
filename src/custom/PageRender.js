import React from "react";
import { useParams } from "react-router-dom";

const generatorPage = (pageName) => {
  const components = () => require(`../pages/${pageName}`).default;
  try {
    return React.createElement(components());
  } catch (error) {
    return <h2>Error</h2>;
  }
};

export const PageRender = () => {
  const { id, page } = useParams();
  let pageName = "";
  pageName = id ? `${page}/[id]` : `${page}`;
  return generatorPage(pageName);
};
