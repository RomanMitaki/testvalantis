import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { TFilter } from "../../utils/types";

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
    <>
      <div>
        <h2>Filter:</h2>
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
        {props.filter && (
          <form method="post" onSubmit={props.handleSubmit}>
            <label htmlFor="inputField">Enter {props.filter}:</label>
            <input
              type="text"
              id="inputField"
              name={"filterInput"}
              value={props.filterValue || ""}
              onChange={handleChange}
            />
          </form>
        )}
      </div>
    </>
  );
};

export default DropdownMenu;
