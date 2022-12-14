import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import Header from "./layout/header";
import reportWebVitals from "./reportWebVitals";
import Container from "./shared/component/container/container";
import { store } from "./store/app-store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <link
      href="https://fonts.googleapis.com/css?family=Raleway"
      rel="stylesheet"
    />
    <link href='https://fonts.googleapis.com/css?family=Roboto Condensed' rel='stylesheet'/>
    <Provider store={store}>
      <BrowserRouter>
        <div style={{ backgroundColor: "#FFFFFF" }}>
          <Header />
          <Container>
            <App />
          </Container>
        </div>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
