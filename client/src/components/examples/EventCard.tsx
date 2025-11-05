import { EventCard } from '../EventCard';

export default function EventCardExample() {
  const event = {
    id: '1',
    title: 'Team Meeting',
    startTime: new Date('2025-01-15T10:00:00'),
    endTime: new Date('2025-01-15T11:00:00'),
    status: 'SWAPPABLE' as const,
    userName: 'John Doe'
  };

  return (
    <div className="max-w-md">
      <EventCard 
        event={event} 
        showUser={true}
        onRequestSwap={(id) => console.log('Request swap:', id)}
      />
    </div>
  );
}
