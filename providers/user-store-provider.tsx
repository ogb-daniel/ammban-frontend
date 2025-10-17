"use client";

import {
  type ReactNode,
  createContext,
  useRef,
  useContext,
  useEffect,
} from "react";
import { useStore } from "zustand";

import {
  type UserStore,
  createUserStore,
  defaultInitState,
} from "@/stores/user-store";
import { refreshUserData } from "@/app/lib/actions/auth";

export type UserStoreApi = ReturnType<typeof createUserStore>;

export const UserStoreContext = createContext<UserStoreApi | undefined>(
  undefined
);

export interface UserStoreProviderProps {
  children: ReactNode;
}

export const UserStoreProvider = ({ children }: UserStoreProviderProps) => {
  const storeRef = useRef<UserStoreApi | null>(null);
  if (!storeRef.current) {
    storeRef.current = createUserStore(defaultInitState);
  }

  useEffect(() => {
    storeRef.current?.persist.rehydrate();
  }, []);

  useEffect(() => {
    const refreshUser = async () => {
      const result = await refreshUserData();
      if (result.success && result.user) {
        storeRef.current?.getState().setUser(result.user);
        console.log("User data refreshed");
      }
    };
    refreshUser();
  }, []);

  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  );
};

export const useUserStore = <T,>(selector: (store: UserStore) => T): T => {
  const userStoreContext = useContext(UserStoreContext);

  if (!userStoreContext) {
    throw new Error(`useUserStore must be used within UserStoreProvider`);
  }

  return useStore(userStoreContext, selector);
};
