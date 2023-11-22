import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar";
import Comment from "./components/Comment";

// ReactDOM.render(<Navbar />, document.getElementById("nav"));
// ReactDOM.render(<Comment />, document.getElementById("root"));

const nav = ReactDOM.createRoot(document.getElementById("nav"));
const root = ReactDOM.createRoot(document.getElementById("root"));

nav.render(
  <React.StrictMode>
    <Navbar />
  </React.StrictMode>
);

root.render(
  <React.StrictMode>
    <Comment />
  </React.StrictMode>
);

/*
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/
