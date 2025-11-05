import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { Calendar, Clock, ArrowLeftRight } from "lucide-react";
import { format } from "date-fns";

type EventStatus = "BUSY" | "SWAPPABLE" | "SWAP_PENDING";

export interface Event {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  status: EventStatus;
  userId?: string;
  userName?: string;
}

interface EventCardProps {
  event: Event;
  onMakeSwappable?: (id: string) => void;
  onEdit?: (id: string) => void;
  onRequestSwap?: (id: string) => void;
  showUser?: boolean;
}

export function EventCard({ 
  event, 
  onMakeSwappable, 
  onEdit, 
  onRequestSwap,
  showUser = false 
}: EventCardProps) {
  const formatTime = (date: Date) => format(date, "h:mm a");
  const formatDate = (date: Date) => format(date, "EEE, MMM d");

  return (
    <Card className="hover-elevate" data-testid={`card-event-${event.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-medium truncate" data-testid={`text-event-title-${event.id}`}>
              {event.title}
            </h3>
            {showUser && event.userName && (
              <p className="text-sm text-muted-foreground mt-1" data-testid={`text-user-${event.id}`}>
                {event.userName}
              </p>
            )}
          </div>
          <StatusBadge status={event.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2 font-mono text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span data-testid={`text-date-${event.id}`}>{formatDate(event.startTime)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span data-testid={`text-time-${event.id}`}>
              {formatTime(event.startTime)} - {formatTime(event.endTime)}
            </span>
          </div>
        </div>
        
        <div className="flex gap-2 pt-2">
          {onRequestSwap && (
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => onRequestSwap(event.id)}
              data-testid={`button-request-swap-${event.id}`}
            >
              <ArrowLeftRight className="h-4 w-4 mr-2" />
              Request Swap
            </Button>
          )}
          {onMakeSwappable && event.status === "BUSY" && (
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onMakeSwappable(event.id)}
              data-testid={`button-make-swappable-${event.id}`}
            >
              Make Swappable
            </Button>
          )}
          {onEdit && (
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => onEdit(event.id)}
              data-testid={`button-edit-${event.id}`}
            >
              Edit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
