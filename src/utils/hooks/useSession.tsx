import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import Loading from "../../components/ui/atoms/Loading";
import { getSession } from "../api/auth";
import { useEffect } from "react";
import useAuth from "./useAuth";

export const useSession = () => {
  const { setUser } = useAuth();
  const { data, isError, isLoading, isFetching } = useQuery({
    queryKey: ["get_session"],
    queryFn: () => getSession(),
  });

  useEffect(() => {
    console.log("Inside useSession");
    console.log({ data });

    if (!isError && !isLoading && data?.user) {
      setUser((prev) => ({
        ...prev,
        ...data.user,
      }));
    }
  }, [data, isError, isLoading, setUser]);

  if (isFetching) return <Loading />;

  if (isError) {
    return <Navigate to={"/auth/login"} />;
  }
};
