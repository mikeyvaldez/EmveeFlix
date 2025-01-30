import { createContext } from "react";

export const AuthFormContext = createContext({
    register: null,
    errors: {},
  });