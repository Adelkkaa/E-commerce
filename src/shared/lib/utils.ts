import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return format(date, "dd.MM.yyyy", { locale: ru });
}
