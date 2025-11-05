import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeftRight, User } from "lucide-react";
import { format } from "date-fns";

type SwapStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export interface SwapRequest {
  id: string;
  mySlot: {
    id: string;
    title: string;
    startTime: Date;
    endTime: Date;
  };
  theirSlot: {
    id: string;
    title: string;
    startTime: Date;
    endTime: Date;
  };
  otherUserName: string;
  status: SwapStatus;
  direction: "incoming" | "outgoing";
}

interface SwapRequestCardProps {
  request: SwapRequest;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
}

export function SwapRequestCard({ request, onAccept, onReject }: SwapRequestCardProps) {
  const formatTime = (date: Date) => format(date, "h:mm a");
  const formatDate = (date: Date) => format(date, "EEE, MMM d");

  const SlotInfo = ({ slot, label }: { slot: SwapRequest['mySlot'], label: string }) => (
    <div className="flex-1 space-y-2">
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </div>
      <div className="bg-muted/50 rounded-lg p-3 space-y-1">
        <div className="font-medium text-sm">{slot.title}</div>
        <div className="font-mono text-xs text-muted-foreground">
          {formatDate(slot.startTime)}
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
        </div>
      </div>
    </div>
  );

  return (
    <Card data-testid={`card-swap-request-${request.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium" data-testid={`text-user-${request.id}`}>
              {request.direction === "incoming" ? `From ${request.otherUserName}` : `To ${request.otherUserName}`}
            </span>
          </div>
          {request.status === "PENDING" && (
            <Badge variant="outline" className="bg-chart-4/10 text-chart-4 border-chart-4/20">
              Pending
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-3 items-center">
          <SlotInfo 
            slot={request.direction === "incoming" ? request.mySlot : request.theirSlot} 
            label={request.direction === "incoming" ? "You Have" : "They Want"} 
          />
          <ArrowLeftRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          <SlotInfo 
            slot={request.direction === "incoming" ? request.theirSlot : request.mySlot} 
            label={request.direction === "incoming" ? "They Want" : "You Offer"} 
          />
        </div>

        {request.direction === "incoming" && request.status === "PENDING" && onAccept && onReject && (
          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => onReject(request.id)}
              data-testid={`button-reject-${request.id}`}
            >
              Reject
            </Button>
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => onAccept(request.id)}
              data-testid={`button-accept-${request.id}`}
            >
              Accept Swap
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
