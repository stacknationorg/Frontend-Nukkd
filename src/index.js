import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./assets/bootstrap/css/bootstrap.min.css"
import "./assets/fonts/font-awesome.min.css";
import "./assets/css/styles.min.css"
// import $ from "jquery"
// import Popper from "popper.js"
import "bootstrap/dist/js/bootstrap"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
