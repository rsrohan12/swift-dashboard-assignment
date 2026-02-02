import { ArrowUp, ArrowDown, ArrowUpDown, UserCog } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SortDirection, SortField } from '@/types/api';

interface SortButtonProps {
  field: SortField;
  label: any;
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
    else{
      return <UserCog className="h-4 w-4" />
    }
    return <ArrowDown className="h-4 w-4" />;
  };

  return (
    <button
      onClick={() => onToggle(field)}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded border text-sm font-medium transition-colors",
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
