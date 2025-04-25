import { User } from "@/app/lib/definitions";
import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

export type UserState = { user: User | null };
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
        setUser: (user) => set({ user: user }),
        clearUser: () => set({ user: null }),
      }),
      {
        name: "user-storage",
        skipHydration: true, // We'll handle hydration manually
        partialize: (state) => ({ user: state.user }), // Only persist the user data
      }
    )
  );
};
