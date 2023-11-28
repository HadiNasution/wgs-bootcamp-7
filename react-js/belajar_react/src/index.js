import React from "react";
import ReactDOM from "react-dom/client";
import Container from "./components/Container";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Container />
  </React.StrictMode>
);

/*
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
ReactDOM.render(<Data data={data} />, document.getElementById("root"));
ReactDOM.render(<Container />, document.getElementById("photos-container"));

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/
