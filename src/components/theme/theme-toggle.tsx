"use client";

import { Moon, Sun } from "lucide-react";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <SegmentedControl
      value={theme}
      onChange={setTheme}
      options={[
        { value: "light", label: <Sun className="h-3.5 w-3.5" />, ariaLabel: "Light mode" },
        { value: "dark", label: <Moon className="h-3.5 w-3.5" />, ariaLabel: "Dark mode" },
      ]}
    />
  );
}
