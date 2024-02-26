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
          <option value="Disabled">Disabled</option>
          <option value="Product">Product</option>
          <option value="Brand">Brand</option>
          <option value="Price">Price</option>
        </select>
      </div>
      <div>
        {props.filter && props.filter !== "Disabled" && (
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
