import { SwapRequestCard } from '../SwapRequestCard';

export default function SwapRequestCardExample() {
  const request = {
    id: '1',
    mySlot: {
      id: '1',
      title: 'Team Meeting',
      startTime: new Date('2025-01-15T10:00:00'),
      endTime: new Date('2025-01-15T11:00:00'),
    },
    theirSlot: {
      id: '2',
      title: 'Focus Block',
      startTime: new Date('2025-01-16T14:00:00'),
      endTime: new Date('2025-01-16T15:00:00'),
    },
    otherUserName: 'Sarah Chen',
    status: 'PENDING' as const,
    direction: 'incoming' as const,
  };

  return (
    <div className="max-w-2xl">
      <SwapRequestCard 
        request={request}
        onAccept={(id) => console.log('Accept:', id)}
        onReject={(id) => console.log('Reject:', id)}
      />
    </div>
  );
}
