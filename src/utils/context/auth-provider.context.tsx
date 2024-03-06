import { createContext, useState } from "react";

export type User = {
  id: number | null;
  name: string | null;
  username: string | null;
  role_id: number | null;
  role: {
    id: number | null;
    name: string | null;
    major: string | null;
  } | null;
};

interface AuthContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const AuthContext = createContext<AuthContextProps>({
  user: {
    id: null,
    name: null,
    role: {
      id: null,
      major: null,
      name: null
    },
    role_id: null,
    username: null,
  },
  setUser: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>({
    id: null,
    name: null,
    role: {
      id: null,
      major: null,
      name: null
    },
    role_id: null,
    username: null,
  });

  return (
    <AuthContext.Provider value={{ setUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
