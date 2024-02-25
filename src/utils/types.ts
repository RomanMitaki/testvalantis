export type TId = string;

export type TItem = {
  brand: string | null;
  id: TId;
  price: number | null;
  product: string | null;
};

export type TIds = TId[];

export type TItems = TItem[];
