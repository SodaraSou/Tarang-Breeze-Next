"use client";

import { useState } from "react";
import { format, add } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function DatePicker({ onValue, onDateChange, disabled }) {
  const [date, setDate] = useState(onValue || null);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    onDateChange(newDate);
  };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const twoDaysLater = add(today, { days: 3 });
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
          disabled={{ before: twoDaysLater }}
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
