
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: "Emerging" | "Operational";
  className?: string;
};

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        "px-2 py-1 text-xs font-medium rounded-full",
        status === "Emerging"
          ? "bg-amber-100 text-amber-700"
          : "bg-emerald-100 text-emerald-700",
        className
      )}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
