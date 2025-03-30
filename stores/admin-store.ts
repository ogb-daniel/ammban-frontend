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

export type Role = {
  title: string;
  description: string;
  color: string;
  permissions: string[];
  id: string;
};

export type Price = {
  amount: number;
  currency: string;
};

export type AdminState = {
  categories: Category[];
  products: Product[];
  roles: Role[];
};

export type AdminActions = {
  createCategory: (category: Category) => void;
  createProduct: (product: Product) => void;
  createRole: (role: Role) => void;
  editRole: (role: Role) => void;
  editProduct: (product: Product) => void;
};

export type AdminStore = AdminState & AdminActions;
export const initAdminStore = (): AdminState => {
  return {
    categories: [],
    products: [
      {
        id: "1",
        name: "AXA PASS",
        category: "INSURANCE",
        price: {
          currency: "NGN",
          amount: 10000,
        },
        description:
          "Provides coverage for medical expenses, including doctor visits, hospital stays, medications, and preventive care.",
      },
      {
        id: "2",
        name: "BAXA PASS",
        category: "ANDURANCE",
        price: {
          currency: "NGN",
          amount: 1000,
        },
        description:
          "Provides coverage for medical expenses, including doctor visits, hospital stays, medications, and preventive care.",
      },
      {
        id: "3",
        name: "CAXA PASS",
        category: "ENDURANCE",
        price: {
          currency: "NGN",
          amount: 5000,
        },
        description:
          "Provides coverage for medical expenses, including doctor visits, hospital stays, medications, and preventive care.",
      },
    ],
    roles: [
      {
        title: "Admin",
        description: "Full access to all features",
        color: "#CC9600",
        permissions: [
          "View Customer’s Information",
          "Edit Customer’s Information",
        ],
        id: "1",
      },
      {
        title: "Agent",
        description: "Limited access to features",
        color: "#0033CC",
        permissions: ["View Customer’s Information"],
        id: "2",
      },
      {
        title: "Aggregators",
        description: "Limited access to features",
        color: "#CC0048",
        permissions: ["View Customer’s Information"],
        id: "3",
      },
      {
        title: "Agent",
        description: "Limited access to features",
        color: "#1AB2A8",
        permissions: ["View Customer’s Information"],
        id: "4",
      },
      {
        title: "Agent",
        description: "Limited access to features",
        color: "#030940",
        permissions: ["View Customer’s Information"],
        id: "5",
      },
      {
        title: "Agent",
        description: "Limited access to features",
        color: "#1AB2A8",
        permissions: ["View Customer’s Information"],
        id: "6",
      },
    ],
  };
};
export const defaultInitState: AdminState = {
  categories: [],
  products: [],
  roles: [],
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
    createRole: (role) =>
      set((state) => ({
        roles: [...state.roles, role],
      })),
    editRole: (role) =>
      set((state) => ({
        roles: state.roles.map((r) => (r.id === role.id ? role : r)),
      })),
    editProduct: (product) =>
      set((state) => ({
        products: state.products.map((p) =>
          p.id === product.id ? product : p
        ),
      })),
  }));
};
