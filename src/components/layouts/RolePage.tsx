import React from "react";
import { useAuth } from "../../utils/hooks/useAuth";
import Loading from "../ui/atoms/Loading/Loading";

type RolePageProps = {
  children: React.ReactNode;
  roles: string[];
};

const RolePage = ({ children, roles }: RolePageProps) => {
  const { user, loading } = useAuth();
  const roleUser = user?.role?.name;

  if (!roleUser || loading) return <Loading />;
  return roles.includes(roleUser) ? children : "your not authenticated";
};

export default RolePage;
