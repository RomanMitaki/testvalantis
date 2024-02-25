import React, { FC } from "react";
import classes from "./ProductCard.module.css";
import { TItem } from "../../utils/types";

type TProductCardProps = {
  item: TItem;
};
const ProductCard: FC<TProductCardProps> = ({ item }) => {
  const { brand, product, price } = item;
  return (
    <div className={classes.ProductCard}>
      <img
        className={classes.ProductCard__image}
        src="photo.jpg"
        alt="Product Photo"
      />
      <h2>{brand || "Бренд не указан"}</h2>
      <p>
        <strong>Цена:</strong> {price || "подлежит уточнению"}
      </p>
      <h3>{product || "Наименование не указано"}</h3>
    </div>
  );
};

export default ProductCard;
