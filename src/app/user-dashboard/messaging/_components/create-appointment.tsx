"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateAppointment } from "@/hooks/user";
import { useAuthStore, useExtraUser } from "@/store/user";
import { LucideLoader } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateAppointment = () => {
  const doctorId = useExtraUser((state) => state.doctorId);
  const user = useAuthStore((state) => state.user);
  const { isPending, mutateAsync } = useCreateAppointment(user?.data?.id);
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedTime, setSelectedTime] = useState<string | undefined>();

  const onSubmit = async () => {
    if (!doctorId) {
      return toast.warning(
        "You can only set an appointment when you start a conversation with a doctor"
      );
    }
    if (!selectedDate || !selectedTime) {
      return toast.warning(
        "Please select both date and time for the appointment"
      );
    }

    const appointmentDateTime = new Date(selectedDate);
    const [hours, minutes] = selectedTime.split(":");
    appointmentDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10));

    mutateAsync({ description, date: appointmentDateTime, doctorId });
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 9; i < 17; i++) {
      slots.push(`${i.toString().padStart(2, "0")}:00`);
      slots.push(`${i.toString().padStart(2, "0")}:30`);
    }
    return slots;
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="text-white">Create an Appointment</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Schedule an appointment</DialogTitle>
        <div className="space-y-4">
          <div>
            <Label htmlFor="description">Enter a short description</Label>
            <Input
              id="description"
              placeholder="Enter a short message"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <Label>Select a date</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </div>

          <div>
            <Label htmlFor="time">Select a time</Label>
            <Select onValueChange={setSelectedTime} value={selectedTime}>
              <SelectTrigger id="time">
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent>
                {generateTimeSlots().map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={onSubmit} disabled={isPending}>
            Schedule Appointment
            {isPending && <LucideLoader className="ml-2 animate-spin" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAppointment;
