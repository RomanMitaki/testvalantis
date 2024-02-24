import React from "react";
import classes from "./Content.module.css";
import ProductCard from "../ProductCard/ProductCard";

const Content = () => {
  return (
    <main className={classes.Content}>
      <div className={classes.Content__cardsContainer}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </main>
  );
};

export default Content;
