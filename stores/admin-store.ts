// src/stores/counter-store.ts
import { Product, Role, User } from "@/app/lib/definitions";
import { createStore } from "zustand/vanilla";

type Category = {
  name: string;
  description: string;
  industry: string;
  id: number;
};
export type Transaction = {
  description: string;
  type: string;
  date: Date;
  amount: Price;
  receipt: string;
  id: number;
  source: string;
};

export type Commission = {
  productName: string;
  description: string;
  role: string;
  percentage: number;
  id: number;
};

export type Price = {
  amount: number;
  currency: string;
};

export type Admin = {
  firstName: string;
  lastName: string;
  description: string;
  position: string;
  location: string;
  website: string;
  email: string;
  phoneNumber: string;
  address: string;
  state: string;
  gender: string;
  id: number;
  role?: string;
};

export type AdminState = {
  categories: Category[];
  products: Product[];
  roles: Role[];
  commissions: Commission[];
  users: User[];
  admin: Admin;
  transactions: Transaction[];
};

export type AdminActions = {
  initializeUsers: (users: User[]) => void;
  initializeCategories: (categories: Category[]) => void;
  initializeProducts: (products: Product[]) => void;
  initializeRoles: (roles: Role[]) => void;
  initializeCommissions: (commissions: Commission[]) => void;
  initializeTransactions: (transactions: Transaction[]) => void;
  createCategory: (category: Category) => void;
  createProduct: (product: Product) => void;
  createRole: (role: Role) => void;
  createCommission: (commission: Commission) => void;
  createUser: (user: User) => void;
  editRole: (id: number, role: Role) => void;
  editProduct: (id: number, product: Product) => void;
  editCommission: (id: number, commission: Commission) => void;
  editUser: (id: number, user: User) => void;
  deleteUser: (id: number) => void;
  deleteProduct: (id: number) => void;
};

export type AdminStore = AdminState & AdminActions;
export const initAdminStore = (): AdminState => {
  return {
    categories: [],
    roles: [],
    products: [],

    commissions: [
      {
        productName: "AXA PASS",
        description: "Provides coverage for medical expenses",
        role: "Admin",
        percentage: 25,
        id: 1,
      },
    ],
    users: [],
    admin: {
      firstName: "David",
      lastName: "Ogbe",
      description: "Full access to all features",
      position: "Software Engineer",
      location: "Lagos, Nigeria",
      website: "https://www.google.com",
      email: "david@google.com",
      phoneNumber: "(234) 907 - 1274 - 515",
      state: "Lagos (Nigeria)",
      address: "12, Opebi Street, Lagos",
      gender: "male",
      id: 1,
      role: "Admin",
    },
    transactions: [
      {
        description: "AXA PASS",
        type: "AXA PASS",
        date: new Date(),
        amount: {
          currency: "NGN",
          amount: 10000,
        },
        receipt: "https://www.google.com",
        id: 1,
        source: "income",
      },
      {
        description: "AXA PASS",
        type: "AXA PASS",
        date: new Date(),
        amount: {
          currency: "NGN",
          amount: 10000,
        },
        receipt: "https://www.google.com",
        id: 2,
        source: "outflow",
      },
    ],
  };
};
export const defaultInitState: AdminState = {
  categories: [],
  products: [],
  roles: [],
  users: [],
  commissions: [],
  admin: {
    firstName: "",
    lastName: "",
    description: "",
    position: "",
    location: "",
    website: "",
    email: "",
    phoneNumber: "",
    state: "",
    address: "",
    gender: "",
    id: 0,
    role: "",
  },
  transactions: [],
};

export const createAdminStore = (initState: AdminState = defaultInitState) => {
  return createStore<AdminStore>()((set) => ({
    ...initState,
    initializeUsers: (users: User[]) =>
      set(() => ({
        users: users,
      })),
    initializeCategories: (categories: Category[]) =>
      set(() => ({
        categories: categories,
      })),
    initializeProducts: (products: Product[]) =>
      set(() => ({
        products: products,
      })),
    initializeRoles: (roles: Role[]) =>
      set(() => ({
        roles: roles,
      })),
    initializeCommissions: (commissions: Commission[]) =>
      set(() => ({
        commissions: commissions,
      })),
    initializeTransactions: (transactions: Transaction[]) =>
      set(() => ({
        transactions: transactions,
      })),
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
    editRole: (id, role) =>
      set((state) => ({
        roles: state.roles.map((r) => (r.id === id ? role : r)),
      })),
    editProduct: (id, product) =>
      set((state) => ({
        products: state.products.map((p) => (p.id === id ? product : p)),
      })),
    editCommission: (id, commission) =>
      set((state) => ({
        commissions: state.commissions.map((c) =>
          c.id === id ? commission : c
        ),
      })),
    createCommission: (commission) =>
      set((state) => ({
        commissions: [...state.commissions, commission],
      })),
    createUser: (user) =>
      set((state) => ({
        users: [...state.users, user],
      })),
    editUser: (id, user) =>
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? user : u)),
      })),
    deleteUser: (id) =>
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
      })),
    deleteProduct: (id) =>
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      })),
  }));
};
