import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";

export const formatFullDate = (date: string) =>
  format(new Date(date), "MMMM d, yyyy");

export const toTitleCase = (str: string) =>
  str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  );

export const formatDate = (dateString: string) => {
  const date = parseISO(dateString); // Parsing string tanggal menjadi objek Date
  const formattedDate = format(date, "d MMMM HH:mm", { locale: id }); // Format tanggal sesuai preferensi
  return formattedDate;
};
