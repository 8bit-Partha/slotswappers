import { useState } from "react";
import { SwapRequestCard, type SwapRequest } from "@/components/SwapRequestCard";
import { EmptyState } from "@/components/EmptyState";
import { Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Requests() {
  //todo: remove mock functionality
  const [incomingRequests, setIncomingRequests] = useState<SwapRequest[]>([
    {
      id: "1",
      mySlot: {
        id: "my1",
        title: "Design Review",
        startTime: new Date("2025-01-15T14:00:00"),
        endTime: new Date("2025-01-15T15:00:00"),
      },
      theirSlot: {
        id: "their1",
        title: "Product Planning",
        startTime: new Date("2025-01-15T11:00:00"),
        endTime: new Date("2025-01-15T12:00:00"),
      },
      otherUserName: "Sarah Chen",
      status: "PENDING",
      direction: "incoming",
    },
  ]);

  const [outgoingRequests] = useState<SwapRequest[]>([
    {
      id: "2",
      mySlot: {
        id: "my2",
        title: "Focus Time",
        startTime: new Date("2025-01-18T10:00:00"),
        endTime: new Date("2025-01-18T12:00:00"),
      },
      theirSlot: {
        id: "their2",
        title: "Code Review Session",
        startTime: new Date("2025-01-16T15:00:00"),
        endTime: new Date("2025-01-16T16:00:00"),
      },
      otherUserName: "Alex Kumar",
      status: "PENDING",
      direction: "outgoing",
    },
  ]);

  const { toast } = useToast();

  const handleAccept = (id: string) => {
    setIncomingRequests(incomingRequests.filter(r => r.id !== id));
    toast({
      title: "Swap accepted",
      description: "The slots have been exchanged successfully.",
    });
  };

  const handleReject = (id: string) => {
    setIncomingRequests(incomingRequests.filter(r => r.id !== id));
    toast({
      title: "Swap rejected",
      description: "The swap request has been declined.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Swap Requests</h1>
        <p className="text-muted-foreground mt-1">
          Manage your incoming and outgoing swap requests
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            Incoming Requests
            {incomingRequests.length > 0 && (
              <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs font-medium">
                {incomingRequests.length}
              </span>
            )}
          </h2>
          {incomingRequests.length === 0 ? (
            <EmptyState
              icon={Bell}
              title="No incoming requests"
              description="You don't have any pending swap requests at the moment."
            />
          ) : (
            <div className="space-y-4">
              {incomingRequests.map((request) => (
                <SwapRequestCard
                  key={request.id}
                  request={request}
                  onAccept={handleAccept}
                  onReject={handleReject}
                />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            Outgoing Requests
            {outgoingRequests.length > 0 && (
              <span className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs font-medium">
                {outgoingRequests.length}
              </span>
            )}
          </h2>
          {outgoingRequests.length === 0 ? (
            <EmptyState
              icon={Bell}
              title="No outgoing requests"
              description="You haven't requested any swaps yet. Visit the marketplace to get started!"
            />
          ) : (
            <div className="space-y-4">
              {outgoingRequests.map((request) => (
                <SwapRequestCard key={request.id} request={request} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
