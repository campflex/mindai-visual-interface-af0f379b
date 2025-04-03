
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: "Emerging" | "Operational";
  className?: string;
};

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        "px-2 py-1 text-xs font-medium rounded-full inline-flex items-center",
        status === "Emerging"
          ? "bg-amber-100 text-amber-700 border border-amber-200"
          : "bg-emerald-100 text-emerald-700 border border-emerald-200",
        className
      )}
    >
      <span className={cn(
        "w-1.5 h-1.5 rounded-full mr-1",
        status === "Emerging" ? "bg-amber-500" : "bg-emerald-500"
      )}></span>
      {status}
    </span>
  );
};

export default StatusBadge;
