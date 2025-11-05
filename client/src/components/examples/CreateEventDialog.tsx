import { CreateEventDialog } from '../CreateEventDialog';

export default function CreateEventDialogExample() {
  return (
    <CreateEventDialog 
      onCreateEvent={(event) => console.log('Create event:', event)}
    />
  );
}
