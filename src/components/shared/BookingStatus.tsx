import type { BookingStatus as BookingStatusType } from "@/data/types";

const config: Record<BookingStatusType, { label: string; className: string }> = {
  booked: { label: "Booked", className: "bg-surface-container-low text-on-surface" },
  pending: { label: "Pending", className: "bg-cherry-fixed text-cherry-dark" },
  "walk-in": { label: "Walk-in", className: "bg-surface-container-high text-on-surface-variant" },
  "no-reservation": { label: "No Reservation", className: "bg-surface-container text-on-surface-variant" },
};

export function BookingStatusBadge({ status }: { status: BookingStatusType }) {
  const { label, className } = config[status];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${className}`}>
      {status === "booked" && <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500" />}
      {status === "pending" && <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-cherry" />}
      {label}
    </span>
  );
}
