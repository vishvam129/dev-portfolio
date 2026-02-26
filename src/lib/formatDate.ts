import { format, parseISO } from "date-fns";

export function formatDate(date: string): string {
  return format(parseISO(date), "MMMM d, yyyy");
}

export function formatMonthYear(date: string): string {
  if (date === "present") return "Present";
  return format(parseISO(`${date}-01`), "MMM yyyy");
}

export function formatDateRange(start: string, end: string | "present"): string {
  return `${formatMonthYear(start)} — ${formatMonthYear(end)}`;
}
