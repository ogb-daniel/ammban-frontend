// src/stores/counter-store.ts
import { createStore } from "zustand/vanilla";

type Category = {
  name: string;
  description: string;
  industry: string;
  id: string;
};
export type Transaction = {
  description: string;
  type: string;
  date: Date;
  amount: Price;
  receipt: string;
  id: string;
  source: string;
};

export type Product = {
  name: string;
  description: string;
  category: string;
  price: Price;
  id: string;
};
export type User = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  state: string;
  gender: string;
  status?: string;
  id: string;
  role?: string;
};

export type Commission = {
  productName: string;
  description: string;
  role: string;
  percentage: number;
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
  id: string;
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
  createCategory: (category: Category) => void;
  createProduct: (product: Product) => void;
  createRole: (role: Role) => void;
  createCommission: (commission: Commission) => void;
  createUser: (user: User) => void;
  editRole: (id: string, role: Role) => void;
  editProduct: (id: string, product: Product) => void;
  editCommission: (id: string, commission: Commission) => void;
  editUser: (id: string, user: User) => void;
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
    commissions: [
      {
        productName: "AXA PASS",
        description: "Provides coverage for medical expenses",
        role: "Admin",
        percentage: 25,
        id: "1",
      },
    ],
    users: [
      {
        firstName: "David",
        lastName: "Ogbe",
        email: "david@google.com",
        phoneNumber: "(234) 907 - 1274 - 515",
        state: "Lagos (Nigeria)",
        address: "12, Opebi Street, Lagos",
        gender: "male",
        status: "Active",
        id: "1",
        role: "Admin",
      },
    ],
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
      id: "1",
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
        id: "1",
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
        id: "2",
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
    id: "",
    role: "",
  },
  transactions: [],
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
  }));
};
