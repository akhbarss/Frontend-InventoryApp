import { useMemo } from "react";
import { useAppSelector } from "../../store/store";
import { useAuth } from "./useAuth";

export const useGetClassRoom = (): { label: string; value: string }[] => {
  const { user } = useAuth();
  const classRoom = useAppSelector((state) => state.class.classes);
  const role = user.role?.major;
  const matchRoleClass = useMemo(() => {
    return classRoom
      .filter((classes) => classes.major === role)
      .map((classes) => ({
        value: classes.id + "",
        label: classes.class_name,
      }));
  }, [classRoom]);
  
  return matchRoleClass;
};
