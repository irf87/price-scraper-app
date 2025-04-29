export interface Item {
  id: number;
  name: string;
  description?: string;
  urlImgCover?: string;
}

export type ItemWithRequiredId = Pick<Item, 'id'> & Partial<Omit<Item, 'id'>>;

export interface ItemWithOptionalId extends Omit<Item, 'id'> {
  id?: number;
}
