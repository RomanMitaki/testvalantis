import React from "react";
import "../../assets/styles/index.css";
import classes from "./App.module.css";
import Content from "../Content/Content";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function App() {
  return (
    <div className={classes.App}>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
