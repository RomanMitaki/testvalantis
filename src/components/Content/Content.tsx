import React, { useCallback, useEffect, useState } from "react";
import classes from "./Content.module.css";
import ProductCard from "../ProductCard/ProductCard";
import { getIds, getItems } from "../../utils/api";
import { TIds, TItems } from "../../utils/types";
import { checkItems } from "../../services/checkItems";
import Pagination from "../Pagination/Pagination";

const ITEMS_PER_PAGE = 50;

const getTotalPageCount = (qtyItems: number): number =>
  Math.ceil(qtyItems / ITEMS_PER_PAGE);

const Content = () => {
  const [ids, setIds] = useState<TIds>([]);
  const [items, setItems] = useState<TItems>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIds = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getIds();
        if (data) setIds(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown Error");
        setIds([]);
      } finally {
        setLoading(false);
      }
    };
    fetchIds();
  }, []);

  useEffect(() => {
    const fetchItems = async (currIds: TIds) => {
      setLoading(true);
      setError(null);
      try {
        const data = await getItems(3, currIds);
        if (data) setItems(checkItems(data));
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown Error");
        setIds([]);
      } finally {
        setLoading(false);
      }
    };
    if (ids.length) {
      fetchItems(ids.slice(0, 100));
    }
  }, [ids]);

  console.log(ids, ids.length);
  console.log(items, items.length);

  const handleNextPageClick = useCallback(() => {
    const current = page;
    const next = current + 1;
    const total = items.length ? getTotalPageCount(items.length) : current;
    setPage(next <= total ? next : current);
    //console.log(page);
  }, [page, items]);

  const handlePrevPageClick = useCallback(() => {
    const current = page;
    const prev = current - 1;
    setPage(prev > 0 ? prev : current);
  }, [page]);

  return (
    <main className={classes.Content}>
      <div className={classes.Content__cardsContainer}>
        {items.length ? (
          <ul>
            {items
              .slice(
                page === 1 ? 0 : ITEMS_PER_PAGE * page - ITEMS_PER_PAGE,
                page === 1 ? ITEMS_PER_PAGE : ITEMS_PER_PAGE * page,
              )
              .map((item, index) => (
                <li key={index}>{<ProductCard item={item} />}</li>
              ))}
          </ul>
        ) : (
          "no data"
        )}
      </div>
      <div>
        {items.length && (
          <Pagination
            onNextPageClick={handleNextPageClick}
            onPrevPageClick={handlePrevPageClick}
            disable={{
              left: page === 1,
              right: page === getTotalPageCount(items.length),
            }}
            nav={{ current: page, total: getTotalPageCount(items.length) }}
          />
        )}
      </div>
    </main>
  );
};

export default Content;
