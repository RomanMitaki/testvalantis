import React from "react";
import classes from "./Pagination.module.css";

type PaginationProps = {
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  disable: {
    left: boolean;
    right: boolean;
  };
  nav?: {
    current: number;
    total: number;
  };
};

const Pagination = (props: PaginationProps) => {
  const { nav = null, disable, onNextPageClick, onPrevPageClick } = props;

  const handleNextPageClick = () => {
    onNextPageClick();
  };
  const handlePrevPageClick = () => {
    onPrevPageClick();
  };

  return (
    <div className={classes.Pagination}>
      <button
        className={classes.Pagination__arrow}
        type="button"
        onClick={handlePrevPageClick}
        disabled={disable.left}
      >
        {"<"}
      </button>
      {nav && (
        <span className={classes.Pagination__navigation}>
          {nav.current} / {nav.total}
        </span>
      )}
      <button
        className={classes.Pagination__arrow}
        type="button"
        onClick={handleNextPageClick}
        disabled={disable.right}
      >
        {">"}
      </button>
    </div>
  );
};

export default React.memo(Pagination);
