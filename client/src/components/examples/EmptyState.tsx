import { EmptyState } from '../EmptyState';
import { Calendar } from 'lucide-react';

export default function EmptyStateExample() {
  return (
    <EmptyState
      icon={Calendar}
      title="No events yet"
      description="Create your first event to get started with SlotSwapper."
      actionLabel="Create Event"
      onAction={() => console.log('Create event clicked')}
    />
  );
}
