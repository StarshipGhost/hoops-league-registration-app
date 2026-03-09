import { useEffect, useRef } from "react";
import { PluginRegistry, TimepickerUI } from "timepicker-ui";
import "timepicker-ui/main.css";
import "timepicker-ui/theme-dark.css";
import { RangePlugin } from "timepicker-ui/plugins/range";

PluginRegistry.register(RangePlugin);

const TimeRangePicker = ({
  start,
  handleStartTimeUpdate,
  end,
  handleEndTimeUpdate,
  darkMode,
}: {
  start: string;
  handleStartTimeUpdate: (data: string) => void;
  end: string;
  handleEndTimeUpdate: (data: string) => void;
  darkMode: boolean;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const pickerRef = useRef<TimepickerUI | null>(null);

  useEffect(() => {
    if (!inputRef.current) return;
    pickerRef.current = new TimepickerUI(inputRef.current, {
      ui: {
        theme: "basic",
        animation: true,
        mobile: false,
        editable: false,
        backdrop: true,
      },
      clock: {
        type: "12h",
        incrementMinutes: 5,
      },
      range: {
        enabled: true,
        fromLabel: "Start",
        toLabel: "End",
      },
      callbacks: {
        onRangeConfirm: (data) => {
          handleStartTimeUpdate(data.from);
          handleEndTimeUpdate(data.to);
        },
        onOpen: () => {
          if (pickerRef.current && darkMode) {
            pickerRef.current.update({
              options: { ui: { theme: "dark" } },
              create: true,
            });
          }
        },
      },
    });

    pickerRef.current.create();
    return () => {
      pickerRef.current?.destroy();
    };
  }, [darkMode]);

  const value = start.length === 0 && end.length === 0 ? "" : `${start} - ${end}`;
  return (
    <input
      ref={inputRef}
      className="w-full text-sm dark:text-white border border-solid border-neutral-300 dark:border-input hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:hover:bg-input/50 px-3 py-2 rounded-md focus:outline-none focus:border-none focus:ring-2 focus:ring-orange-500/90 dark:focus:ring-orange-400 invalid:border-red-500 invalid:outline-red-500"
      type="text"
      value={value}
      placeholder="Select a time"
      onChange={(e) => e.preventDefault()}
    />
  );
};

export default TimeRangePicker;
