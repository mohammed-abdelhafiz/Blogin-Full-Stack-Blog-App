import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDateForUser(
  timestamp: number,
  locale = "en-GB"
) {
  const timeZone =
    Intl.DateTimeFormat().resolvedOptions().timeZone;

  return new Date(timestamp).toLocaleString(locale, {
    timeZone,
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}
