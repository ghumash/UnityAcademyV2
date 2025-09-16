"use client";

import * as React from "react";
import { ChevronDownIcon, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ru, enUS, hy } from "date-fns/locale";

import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/popover";
import { cn } from "@/shared/lib/utils";

export interface DatePickerFieldProps {
  name: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  locale?: "hy" | "en" | "ru";
  className?: string;
}

const localeMap = {
  hy: hy,
  en: enUS,
  ru: ru,
};

export function DatePickerField({
  name,
  placeholder = "Select date",
  value,
  onChange,
  error,
  locale = "en",
  className,
}: DatePickerFieldProps) {
  const [open, setOpen] = React.useState(false);
  const selectedDate = React.useMemo(() => {
    if (!value) return undefined;
    // Парсим дату в формате yyyy-MM-dd
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day); // month - 1 потому что месяцы в JS начинаются с 0
  }, [value]);
  const dateLocale = localeMap[locale];
  
  // Состояние для управления месяцем в календаре
  const [calendarMonth, setCalendarMonth] = React.useState<Date>(() => {
    return selectedDate || new Date();
  });
  
  // Обновляем месяц календаря при изменении выбранной даты
  React.useEffect(() => {
    if (selectedDate) {
      setCalendarMonth(selectedDate);
    }
  }, [selectedDate]);

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      // Форматируем в yyyy-MM-dd для совместимости с HTML input[type="date"]
      const formattedDate = format(date, "yyyy-MM-dd");
      onChange(formattedDate);
      setOpen(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-between font-normal",
              !selectedDate && "text-muted-foreground",
              error && "border-destructive"
            )}
          >
            <div className="flex items-center">
              {selectedDate
                ? format(selectedDate, "dd.MM.yyyy", { locale: dateLocale })
                : placeholder}
            </div>
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            captionLayout="dropdown"
            fromYear={1950}
            toYear={new Date().getFullYear()}
            month={calendarMonth}
            onMonthChange={setCalendarMonth}
            locale={dateLocale}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}