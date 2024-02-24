import React from "react";
import classes from "./ProductCard.module.css";

const ProductCard = () => {
  return (
    <div className={classes.ProductCard}>
      <img src="photo.jpg" alt="Product Photo" />
      <h2>Название бренда</h2>
      <p>
        <strong>Цена:</strong> $100
      </p>
      <h3>Наименование товара</h3>
    </div>
  );
};

export default ProductCard;
