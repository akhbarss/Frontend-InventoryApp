import { AxiosError } from "axios";
import { showNotifications } from "./showNotifications";

export const ResponseError = (error: AxiosError) => {

  const responseData = error.response?.data as any;
  if (responseData) {
    const errMsg = responseData?.message;
    if (errMsg) {
      showNotifications({
        type: "error",
        title: errMsg,
      });
    }
    return;
  }

  if (error.message) {
    showNotifications({
      type: "error",
      title: error.message,
    });
  }
};
