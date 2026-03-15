"use client"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"
import { useState } from "react"

export function DatePicker({date, setDate} : {date : Date | undefined, setDate : React.Dispatch<React.SetStateAction<Date | undefined>>}) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Popover open={open} defaultOpen={false}> 
      <PopoverTrigger onClick={() => setOpen(true)} asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground border-neutral-300 dark:border-input w-full justify-between text-left font-normal focus:outline-none focus:border-none focus:ring-2 focus:ring-orange-500/90 dark:focus:ring-orange-400 cursor-pointer"
        >
          {date ? format(date, "PPP") : <span>Select a date</span>}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={"w-auto flex flex-col items-center p-0 z-9999 dark:bg-black"} align="start">
        <Calendar
          mode="single"
          disabled={{before: new Date()}}
          selected={date}
          onSelect={setDate}
          startMonth={new Date()}
          defaultMonth={date}
          onDayClick={() => setOpen(false)}
        />
      </PopoverContent>
    </Popover>
  )
}