import { create } from "zustand";

interface Item {
  id: number;
  title: string;
}

interface ListStore {
  page: number;
  mydata: Item[];
  setPage: (page: number) => void;
  setMydata: (data: Item[]) => void;
  addMydata: (newData: Item[]) => void;
}

export const useListStore = create<ListStore>((set) => ({
  page: 1,
  mydata: [],
  setPage: (page) => set({ page }),
  setMydata: (data) => set({ mydata: data }),
  addMydata: (newData) =>
    set((state) => ({ mydata: [...state.mydata, ...newData] })),
}));
