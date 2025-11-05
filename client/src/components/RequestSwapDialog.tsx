import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Event } from "./EventCard";
import { format } from "date-fns";

interface RequestSwapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  targetEvent: Event | null;
  mySwappableSlots: Event[];
  onConfirm?: (mySlotId: string, theirSlotId: string) => void;
}

export function RequestSwapDialog({
  open,
  onOpenChange,
  targetEvent,
  mySwappableSlots,
  onConfirm,
}: RequestSwapDialogProps) {
  const [selectedSlotId, setSelectedSlotId] = useState("");

  const handleConfirm = () => {
    if (selectedSlotId && targetEvent && onConfirm) {
      onConfirm(selectedSlotId, targetEvent.id);
      setSelectedSlotId("");
      onOpenChange(false);
    }
  };

  const formatTime = (date: Date) => format(date, "h:mm a");
  const formatDate = (date: Date) => format(date, "EEE, MMM d");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" data-testid="dialog-request-swap">
        <DialogHeader>
          <DialogTitle>Select Your Slot to Offer</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              They Are Offering
            </div>
            {targetEvent && (
              <div>
                <div className="font-medium">{targetEvent.title}</div>
                <div className="font-mono text-sm text-muted-foreground mt-1">
                  {formatDate(targetEvent.startTime)} • {formatTime(targetEvent.startTime)} - {formatTime(targetEvent.endTime)}
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="text-sm font-medium mb-3">Choose one of your swappable slots:</div>
            {mySwappableSlots.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-6">
                You don't have any swappable slots yet.
              </div>
            ) : (
              <RadioGroup value={selectedSlotId} onValueChange={setSelectedSlotId}>
                <div className="space-y-2">
                  {mySwappableSlots.map((slot) => (
                    <div key={slot.id} className="flex items-start space-x-3 border rounded-lg p-3 hover-elevate">
                      <RadioGroupItem 
                        value={slot.id} 
                        id={slot.id}
                        data-testid={`radio-slot-${slot.id}`}
                      />
                      <Label htmlFor={slot.id} className="flex-1 cursor-pointer">
                        <div className="font-medium">{slot.title}</div>
                        <div className="font-mono text-xs text-muted-foreground mt-1">
                          {formatDate(slot.startTime)} • {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            <Button 
              variant="ghost" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirm}
              disabled={!selectedSlotId}
              className="flex-1"
              data-testid="button-confirm"
            >
              Confirm Request
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
