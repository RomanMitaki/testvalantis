import React, { useState } from "react";

const DropdownMenu = () => {
  const [selectedOption, setSelectedOption] = useState("");
  /*
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
*/
  return (
    <>
      <div>
        <h2>Select an option:</h2>
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="Product">Product</option>
          <option value="Brand">Brand</option>
          <option value="Price">Price</option>
        </select>
      </div>
      <div>
        {selectedOption && (
          <form>
            <label htmlFor="inputField">Enter {selectedOption}:</label>
            <input type="text" id="inputField" />
          </form>
        )}
      </div>
    </>
  );
};

export default DropdownMenu;
