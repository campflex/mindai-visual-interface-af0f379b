
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FilterTab = {
  label: string;
  value: string;
};

type FilterTabsProps = {
  tabs: FilterTab[];
  activeTab: string;
  onTabChange: (value: string) => void;
  className?: string;
};

const FilterTabs = ({ tabs, activeTab, onTabChange, className }: FilterTabsProps) => {
  return (
    <div className={cn("flex gap-1 p-1 bg-muted rounded-lg", className)}>
      {tabs.map((tab) => (
        <Button
          key={tab.value}
          variant={activeTab === tab.value ? "default" : "ghost"}
          className={cn(
            "flex-1 text-sm transition-all",
            activeTab === tab.value 
              ? "bg-accent text-black font-medium shadow-sm" 
              : "text-muted-foreground hover:text-black hover:bg-accent/50"
          )}
          onClick={() => onTabChange(tab.value)}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};

export default FilterTabs;
