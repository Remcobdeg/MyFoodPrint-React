import { createContext } from "react";

export const navContext = createContext({
    currentPage: null,
    setPage: () => {}
});
