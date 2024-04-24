import { ROLE } from "@utils/types/user,type";
import { createContext, useState } from "react";

export type User = {
  id: number | null;
  name: string | null;
  username: string | null;
  role_id: number | null;
  role: {
    id: number | null;
    name: string | null;
    major: ROLE | null;
  } | null;
};

interface AuthContextProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextProps>({
  user: {
    id: null,
    name: null,
    role: {
      id: null,
      major: null,
      name: null,
    },
    role_id: null,
    username: null,
  },
  setUser: () => {},
  loading: false,
  setLoading: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>({
    id: null,
    name: null,
    role: {
      id: null,
      major: null,
      name: null,
    },
    role_id: null,
    username: null,
  });

  return (
    <AuthContext.Provider value={{ setUser, user, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
