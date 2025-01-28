// src/stores/counter-store.ts
import { createStore } from "zustand/vanilla";

type Category = {
  name: string;
  description: string;
  industry: string;
  id: string;
};
export type Product = {
  name: string;
  description: string;
  category: string;
  price: Price;
  id: string;
};

export type Price = {
  amount: number;
  currency: string;
};

export type AdminState = {
  categories: Category[];
  products: Product[];
};

export type AdminActions = {
  createCategory: (category: Category) => void;
  createProduct: (product: Product) => void;
};

export type AdminStore = AdminState & AdminActions;
export const initAdminStore = (): AdminState => {
  return {
    categories: [],
    products: Array<Product>(10).fill({
      id: "1",
      name: "AXA PASS",
      category: "INSURANCE",
      price: {
        currency: "NGN",
        amount: 10000,
      },
      description:
        "Provides coverage for medical expenses, including doctor visits, hospital stays, medications, and preventive care.",
    }),
  };
};
export const defaultInitState: AdminState = {
  categories: [],
  products: [],
};

export const createAdminStore = (initState: AdminState = defaultInitState) => {
  return createStore<AdminStore>()((set) => ({
    ...initState,
    createCategory: (category) =>
      set((state) => ({
        categories: [...state.categories, category],
      })),
    createProduct: (product) =>
      set((state) => ({
        products: [...state.products, product],
      })),
  }));
};
