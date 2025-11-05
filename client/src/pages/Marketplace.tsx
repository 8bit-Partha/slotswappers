import { useState } from "react";
import { EventCard, type Event } from "@/components/EventCard";
import { RequestSwapDialog } from "@/components/RequestSwapDialog";
import { EmptyState } from "@/components/EmptyState";
import { Store } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Marketplace() {
  //todo: remove mock functionality
  const [availableSlots] = useState<Event[]>([
    {
      id: "1",
      title: "Product Planning",
      startTime: new Date("2025-01-15T11:00:00"),
      endTime: new Date("2025-01-15T12:00:00"),
      status: "SWAPPABLE",
      userId: "user2",
      userName: "Sarah Chen",
    },
    {
      id: "2",
      title: "Code Review Session",
      startTime: new Date("2025-01-16T15:00:00"),
      endTime: new Date("2025-01-16T16:00:00"),
      status: "SWAPPABLE",
      userId: "user3",
      userName: "Alex Kumar",
    },
    {
      id: "3",
      title: "Weekly Sync",
      startTime: new Date("2025-01-17T09:00:00"),
      endTime: new Date("2025-01-17T09:30:00"),
      status: "SWAPPABLE",
      userId: "user4",
      userName: "Maria Garcia",
    },
  ]);

  const [mySwappableSlots] = useState<Event[]>([
    {
      id: "my1",
      title: "Design Review",
      startTime: new Date("2025-01-15T14:00:00"),
      endTime: new Date("2025-01-15T15:00:00"),
      status: "SWAPPABLE",
    },
    {
      id: "my2",
      title: "Focus Time",
      startTime: new Date("2025-01-18T10:00:00"),
      endTime: new Date("2025-01-18T12:00:00"),
      status: "SWAPPABLE",
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { toast } = useToast();

  const handleRequestSwap = (eventId: string) => {
    const event = availableSlots.find(e => e.id === eventId);
    if (event) {
      setSelectedEvent(event);
      setDialogOpen(true);
    }
  };

  const handleConfirmSwap = (mySlotId: string, theirSlotId: string) => {
    console.log("Swap requested:", { mySlotId, theirSlotId });
    toast({
      title: "Swap request sent",
      description: "The other user will be notified of your request.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <p className="text-muted-foreground mt-1">
          Browse and request swappable slots from other users
        </p>
      </div>

      {availableSlots.length === 0 ? (
        <EmptyState
          icon={Store}
          title="No slots available"
          description="There are no swappable slots available at the moment. Check back later!"
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {availableSlots.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              showUser={true}
              onRequestSwap={handleRequestSwap}
            />
          ))}
        </div>
      )}

      <RequestSwapDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        targetEvent={selectedEvent}
        mySwappableSlots={mySwappableSlots}
        onConfirm={handleConfirmSwap}
      />
    </div>
  );
}
