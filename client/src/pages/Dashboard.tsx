import { useState } from "react";
import { EventCard, type Event } from "@/components/EventCard";
import { CreateEventDialog } from "@/components/CreateEventDialog";
import { EmptyState } from "@/components/EmptyState";
import { Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  //todo: remove mock functionality
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Team Standup",
      startTime: new Date("2025-01-15T09:00:00"),
      endTime: new Date("2025-01-15T09:30:00"),
      status: "BUSY",
    },
    {
      id: "2",
      title: "Design Review",
      startTime: new Date("2025-01-15T14:00:00"),
      endTime: new Date("2025-01-15T15:00:00"),
      status: "SWAPPABLE",
    },
    {
      id: "3",
      title: "Client Presentation",
      startTime: new Date("2025-01-16T10:00:00"),
      endTime: new Date("2025-01-16T11:30:00"),
      status: "SWAP_PENDING",
    },
  ]);

  const { toast } = useToast();

  const handleCreateEvent = (newEvent: { title: string; startTime: Date; endTime: Date }) => {
    const event: Event = {
      id: Date.now().toString(),
      ...newEvent,
      status: "BUSY",
    };
    setEvents([...events, event]);
    toast({
      title: "Event created",
      description: `${newEvent.title} has been added to your calendar.`,
    });
  };

  const handleMakeSwappable = (id: string) => {
    setEvents(events.map(e => 
      e.id === id ? { ...e, status: "SWAPPABLE" as const } : e
    ));
    toast({
      title: "Slot marked as swappable",
      description: "Other users can now request to swap this slot.",
    });
  };

  const handleEdit = (id: string) => {
    console.log("Edit event:", id);
    toast({
      title: "Edit functionality",
      description: "This will be implemented in the full application.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold">My Calendar</h1>
          <p className="text-muted-foreground mt-1">
            Manage your events and make them swappable
          </p>
        </div>
        <CreateEventDialog onCreateEvent={handleCreateEvent} />
      </div>

      {events.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No events yet"
          description="Create your first event to get started with SlotSwapper."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onMakeSwappable={handleMakeSwappable}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
