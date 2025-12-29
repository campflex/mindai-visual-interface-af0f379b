import { cn } from "@/lib/utils";

type BetaBadgeProps = {
  isBeta?: boolean;
  className?: string;
};

const BetaBadge = ({ isBeta = false, className }: BetaBadgeProps) => {
  if (!isBeta) return null;
  
  return (
    <span
      className={cn(
        "px-2 py-1 text-xs font-medium rounded-full inline-flex items-center",
        "bg-purple-100 text-purple-700 border border-purple-200",
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1 bg-purple-500"></span>
      Beta
    </span>
  );
};

export default BetaBadge;
