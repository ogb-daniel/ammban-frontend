import { User } from "@/app/lib/definitions";
import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

export type UserState = { user: (User & { role: string }) | null };
type UserActions = {
  setUser: (user: User) => void;
  clearUser: () => void;
};
export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  user: null,
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()(
    persist(
      (set) => ({
        ...initState,
        setUser: (user) => set({ user: { ...user, role: "" } }),
        clearUser: () => set({ user: null }),
      }),
      {
        name: "user-storage", // unique name for localStorage key
        skipHydration: true, // important for Next.js
      }
    )
  );
};
