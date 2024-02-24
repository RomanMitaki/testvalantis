import { TId, TItems } from "../utils/types";

export const checkItems = (items: TItems): TItems => {
  const res: TItems = [];
  const ids = new Set<TId>();
  for (let item of items) {
    if (!ids.has(item.id)) {
      ids.add(item.id);
      res.push(item);
    }
  }
  return res;
};
