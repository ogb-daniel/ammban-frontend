// src/providers/admin-store-provider.tsx
"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type AdminStore,
  createAdminStore,
  initAdminStore,
} from "@/stores/admin-store";

export type AdminStoreApi = ReturnType<typeof createAdminStore>;

export const AdminStoreContext = createContext<AdminStoreApi | undefined>(
  undefined
);

export interface AdminStoreProviderProps {
  children: ReactNode;
}

export const AdminStoreProvider = ({ children }: AdminStoreProviderProps) => {
  const storeRef = useRef<AdminStoreApi | null>(null);
  if (!storeRef.current) {
    storeRef.current = createAdminStore(initAdminStore());
  }

  return (
    <AdminStoreContext.Provider value={storeRef.current}>
      {children}
    </AdminStoreContext.Provider>
  );
};

export const useAdminStore = <T,>(selector: (store: AdminStore) => T): T => {
  const adminStoreContext = useContext(AdminStoreContext);

  if (!adminStoreContext) {
    throw new Error(`useAdminStore must be used within AdminStoreProvider`);
  }

  return useStore(adminStoreContext, selector);
};
