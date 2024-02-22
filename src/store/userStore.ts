import { AuthorProps } from "@/interfaces/blog";
import { create } from "zustand";

interface UserStoreInterface {
    user: AuthorProps | null;
    setUser: (user: AuthorProps | null) => void;
}

export const UserStore = create<UserStoreInterface>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));
