import { TIds } from "../utils/types";

export const splitIds = (ids: TIds, size: number): TIds[] => {
  const res: TIds[] = [];
  for (let i = 0; i < ids.length; i += size) {
    res.push(ids.slice(i, size + i));
  }
  return res;
};
