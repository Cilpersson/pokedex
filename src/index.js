import React from "react";
import ReactDOM from "react-dom";
import GlobalStyle from "./lib/globalStyles";
import App from "./App";

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <>
    <App />
    <GlobalStyle />
  </>,
  document.getElementById("root")
);
