import { Badge } from "@/components/ui/badge";
import type { BookingStatus as BookingStatusType } from "@/data/types";

const config: Record<BookingStatusType, { label: string; className: string }> = {
  booked: { label: "Booked", className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
  pending: { label: "Pending", className: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200" },
  "walk-in": { label: "Walk-in", className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
  "no-reservation": { label: "No Reservation", className: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300" },
};

export function BookingStatusBadge({ status }: { status: BookingStatusType }) {
  const { label, className } = config[status];
  return <Badge variant="secondary" className={className}>{label}</Badge>;
}
