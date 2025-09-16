"use client";

import { memo } from "react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Button,
} from "@/shared/ui";
import { Moon, Sun } from "lucide-react";

export const ModeToggle = memo(() => {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="rounded-full">
        <Button variant="outline" size="icon" aria-label="Переключить тему">
          <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-auto min-w-0">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          aria-checked={theme === "light"}
          role="menuitemradio"
        >
          Светлая
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          aria-checked={theme === "dark"}
          role="menuitemradio"
        >
          Тёмная
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          aria-checked={theme === "system"}
          role="menuitemradio"
        >
          Системная
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
