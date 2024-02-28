import React, {
  FormEvent,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from "react";
import classes from "./Content.module.css";
import ProductCard from "../ProductCard/ProductCard";
import { getFilteredIds, getIds, getItems } from "../../utils/api";
import { TFilter, TIds, TItems } from "../../utils/types";
import { checkItems } from "../../services/checkItems";
import Pagination from "../Pagination/Pagination";
import { splitIds } from "../../services/splitIds";
import Loader from "../Loader/Loader";
import DropdownMenu from "../Dropdownmenu/Dropdownmenu";

const ITEMS_PER_PAGE = 50;

const getTotalPageCount = (qtyItems: number): number =>
  Math.ceil(qtyItems / ITEMS_PER_PAGE);

const Content = () => {
  const [ids, setIds] = useState<TIds>([]);
  const [idsChunks, setIdsChunks] = useState<TIds[]>([]);
  const [items, setItems] = useState<TItems>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<TFilter>("disabled");
  const [filterValue, setFilterValue] = useState("");

  const fetchItems = async (currIds: TIds) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getItems(3, currIds);
      if (data) {
        setItems((prevItems) => {
          const newItems = checkItems(data);
          const uniqueItems = newItems.filter(
            (item) => !prevItems.some((prevItem) => prevItem.id === item.id),
          );
          return [...prevItems, ...uniqueItems];
        });
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown Error");
      setItems(items);
    } finally {
      setLoading(false);
    }
  };
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

  const fetchFilteredIds = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFilteredIds(3, filter, filterValue);
      if (data) setIds(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIds();
  }, []);

  useEffect(() => {
    if (ids.length) {
      const idsChunks = splitIds(ids, 100);
      setIdsChunks(idsChunks);
    }
  }, [ids]);

  useEffect(() => {
    fetchItems(idsChunks[0]);
  }, [idsChunks]);

  useEffect(() => {}, []);

  //console.log(idsChunks, idsChunks.length);
  //console.log(items, items.length);

  const handleNextPageClick = useCallback(() => {
    const current = page;
    const next = current + 1;
    const total = items.length ? getTotalPageCount(items.length) : current;
    setPage(next <= total ? next : current);
    if (current === total - 1 && Math.ceil(total / 2) < idsChunks.length) {
      fetchItems(idsChunks[Math.ceil(current / 2)]);
    }
  }, [page, items, idsChunks, getTotalPageCount, fetchItems]);

  const handlePrevPageClick = useCallback(() => {
    const current = page;
    const prev = current - 1;
    setPage(prev > 0 ? prev : current);
  }, [page]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setItems([]);
    setPage(1);
    if (filter === "disabled") {
      fetchIds();
    } else {
      fetchFilteredIds();
    }
    setFilterValue("");
  };

  return (
    <main className={classes.Main}>
      <DropdownMenu
        handleSubmit={handleSubmit}
        setFilter={setFilter}
        setFilterValue={setFilterValue}
        filter={filter}
        filterValue={filterValue}
      />
      <div className={classes.Content}>
        {!items.length && !isLoading && filter !== "disabled" ? (
          <p>Подходящих товаров не найдено</p>
        ) : items.length && !isLoading ? (
          <div className={classes.Content__wrapper}>
            <ul className={classes.Content__cardsContainer}>
              {items
                .slice(
                  page === 1 ? 0 : ITEMS_PER_PAGE * page - ITEMS_PER_PAGE,
                  page === 1 ? ITEMS_PER_PAGE : ITEMS_PER_PAGE * page,
                )
                .map((item, index) => (
                  <li key={index}>{<ProductCard item={item} />}</li>
                ))}
            </ul>
          </div>
        ) : (
          <Loader />
        )}

        <div className={classes.Content__paginationContainer}>
          {items.length && !isLoading ? (
            <Pagination
              onNextPageClick={handleNextPageClick}
              onPrevPageClick={handlePrevPageClick}
              disable={{
                left: page === 1,
                right: page === getTotalPageCount(items.length),
              }}
              nav={{ current: page, total: getTotalPageCount(items.length) }}
            />
          ) : (
            <div />
          )}
        </div>
      </div>
    </main>
  );
};

export default Content;
