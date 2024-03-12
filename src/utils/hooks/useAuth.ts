import { useContext } from "react";
import AuthContext from "../context/auth-provider.context";

export const useAuth = () => {
  return useContext(AuthContext);
};
