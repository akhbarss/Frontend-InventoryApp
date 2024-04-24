import axios from "../../axios";

type ResponseGetAllNotification = {
  statusCode: number;
  timestamp: string;
  payload: {
    getNotifications: {
      created_at: string;
      updated_at: string;
      deleted_at: null;
      id: number;
      title: string;
      content: string;
      date_send: string;
      color: string;
      hasRead: boolean;
      user_id: number;
      toSuperadmin: false;
    }[];
  };
};

export const getAllNotifications = async (
  userId: number | string
): Promise<ResponseGetAllNotification> => {
  const response = await axios.get(
    `/notification/get-notifications?id=${userId}`
  );
  return response.data;
};

export const findNotifById = async (id: number) => {
  const response = await axios.get(
    `/notification/find-notif-by-id?notif-id=${id}`
  );
  return response.data;
};

export const deleteNotifById = async (id: number) => {
  const response = await axios.delete(
    `/notification/delete-notification?notif-id=${id}`
  );
  return response.data;
};

export const readAllNotif = async (userID:number) => {
  const response = await axios.patch(`/notification/read-all?user-id=${userID}`)
  return response.data
}