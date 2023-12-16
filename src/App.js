import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./screens/Home";
import About from "./screens/About";
import Error from "./screens/Error";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
