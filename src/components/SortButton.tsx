import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { SortDirection, SortField } from '@/types/api';
import { cn } from '@/lib/utils';

interface SortButtonProps {
  field: SortField;
  label: string;
  currentField: SortField;
  currentDirection: SortDirection;
  onToggle: (field: SortField) => void;
}

const SortButton = ({
  field,
  label,
  currentField,
  currentDirection,
  onToggle,
}: SortButtonProps) => {
  const isActive = currentField === field && currentDirection !== null;

  const getIcon = () => {
    if (!isActive) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    if (currentDirection === 'asc') {
      return <ArrowUp className="h-4 w-4" />;
    }
    return <ArrowDown className="h-4 w-4" />;
  };

  return (
    <button
      onClick={() => onToggle(field)}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded border text-sm font-medium transition-colors",
        isActive
          ? "border-primary bg-primary/10 text-primary"
          : "border-border hover:bg-muted"
      )}
    >
      Sort {label}
      {getIcon()}
    </button>
  );
};

export default SortButton;
