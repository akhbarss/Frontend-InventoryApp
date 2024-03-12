import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getClasses } from "../api/class";

export const useClass = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getClasses());
  }, []);

  const dataClasses = useAppSelector((state) => state.class.classes);
  const error = useAppSelector((state) => state.class.error);
  const isLoading = useAppSelector((state) => state.class.loading);

  return { dataClasses, error, isLoading };
};
