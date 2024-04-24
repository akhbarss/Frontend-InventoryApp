import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/ui/atoms/Loading/Loading";
import { getSession } from "../api/auth";
import { useAuth } from "./useAuth";

export const useSession = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { data, isError, isLoading, isFetching } = useQuery({
    queryKey: ["get_session"],
    queryFn: getSession,
  });
  useEffect(() => {
    if (!isError && !isLoading && data?.payload.getSession) {
      setUser((prev) => ({
        ...prev,
        ...data.payload.getSession,
      }));
    }

    if (isError) {
      const name = "inven-cookies-id";
      document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
      navigate("/auth/login");
    }
  }, [data, isError, isLoading, setUser]);

  if (isFetching) return <Loading />;
};
