import React, { ChangeEvent, FC, FormEvent } from "react";
import { TFilter } from "../../utils/types";
import classes from "./Dropdownmenu.module.css";

type TDropdownMenuProps = {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setFilter: React.Dispatch<React.SetStateAction<TFilter>>;
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
  filter: TFilter;
  filterValue: string;
};
const DropdownMenu: FC<TDropdownMenuProps> = (props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    props.setFilterValue(value);
  };

  return (
    <div className={classes.DropdownMenu}>
      <div>
        <h2 style={{ textAlign: "left" }}>Filter:</h2>
        <select
          value={props.filter}
          // @ts-ignore
          onChange={(e) => props.setFilter(e.target.value)}
        >
          <option value="disabled">disabled</option>
          <option value="product">product</option>
          <option value="brand">brand</option>
          <option value="price">price</option>
        </select>
      </div>
      <div>
        <form method="post" onSubmit={props.handleSubmit}>
          <label htmlFor="inputField">
            {props.filter === "disabled"
              ? `Click button to disable filters`
              : `Enter ${props.filter}`}
            :
          </label>
          <input
            type={props.filter === "price" ? "number" : "text"}
            id="inputField"
            name={"filterInput"}
            value={props.filterValue || ""}
            onChange={handleChange}
            disabled={props.filter === "disabled"}
          />
          <button className={classes.DropdownMenu__button} type="submit">
            ok
          </button>
        </form>
      </div>
    </div>
  );
};

export default DropdownMenu;
