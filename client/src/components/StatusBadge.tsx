import { Badge } from "@/components/ui/badge";

type EventStatus = "BUSY" | "SWAPPABLE" | "SWAP_PENDING";

interface StatusBadgeProps {
  status: EventStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variants = {
    BUSY: { label: "Busy", className: "bg-muted text-muted-foreground border-muted-border" },
    SWAPPABLE: { label: "Swappable", className: "bg-chart-2/10 text-chart-2 border-chart-2/20" },
    SWAP_PENDING: { label: "Swap Pending", className: "bg-chart-4/10 text-chart-4 border-chart-4/20" },
  };

  const { label, className } = variants[status];

  return (
    <Badge 
      variant="outline" 
      className={`text-xs px-3 py-1 rounded-full ${className}`}
      data-testid={`badge-${status.toLowerCase()}`}
    >
      {label}
    </Badge>
  );
}
