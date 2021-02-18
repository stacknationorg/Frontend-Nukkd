import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routers from "./shared/Routers";
import Navigation from "./components/Navigation";
import logo from "./logo.svg";

function App() {

  return (
    <Router>
      <Navigation logo={logo}/>
      <Routers/>
    </Router>
  );
}

export default App;
