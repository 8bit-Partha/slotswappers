import { useState } from 'react';
import { RequestSwapDialog } from '../RequestSwapDialog';
import { Button } from '@/components/ui/button';

export default function RequestSwapDialogExample() {
  const [open, setOpen] = useState(false);

  const targetEvent = {
    id: '1',
    title: 'Team Meeting',
    startTime: new Date('2025-01-15T10:00:00'),
    endTime: new Date('2025-01-15T11:00:00'),
    status: 'SWAPPABLE' as const,
    userName: 'John Doe'
  };

  const mySlots = [
    {
      id: '2',
      title: 'Focus Block',
      startTime: new Date('2025-01-16T14:00:00'),
      endTime: new Date('2025-01-16T15:00:00'),
      status: 'SWAPPABLE' as const,
    },
    {
      id: '3',
      title: 'Design Review',
      startTime: new Date('2025-01-17T09:00:00'),
      endTime: new Date('2025-01-17T10:00:00'),
      status: 'SWAPPABLE' as const,
    },
  ];

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <RequestSwapDialog
        open={open}
        onOpenChange={setOpen}
        targetEvent={targetEvent}
        mySwappableSlots={mySlots}
        onConfirm={(mySlotId, theirSlotId) => console.log('Swap requested:', mySlotId, theirSlotId)}
      />
    </div>
  );
}
