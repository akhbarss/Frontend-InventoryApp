import { useIsFetching } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useIsFetchingSession = () => {
  const isFetchingSession = useIsFetching({ queryKey: ["get_session"] });
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (isFetchingSession == 0) {
        setLoad(false);
      }
    }, 1000);
  }, [isFetchingSession]);

  return load ? true : false;
};
