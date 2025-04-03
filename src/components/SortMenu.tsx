
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SortOption = {
  label: string;
  value: string;
};

type SortMenuProps = {
  options: SortOption[];
  selectedOption: string;
  onSelect: (value: string) => void;
  label: string;
};

const SortMenu = ({ options, selectedOption, onSelect, label }: SortMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <span>{label}:</span>
          <span className="font-medium">{options.find(opt => opt.value === selectedOption)?.label}</span>
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onSelect(option.value)}
            className="flex items-center justify-between"
          >
            {option.label}
            {option.value === selectedOption && <Check size={16} />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortMenu;
