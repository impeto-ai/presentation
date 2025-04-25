"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface InteractiveButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  disabled?: boolean;
}

export function InteractiveButton({
  onClick,
  children,
  className,
  variant = "default",
  size = "default",
  disabled = false,
}: InteractiveButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("InteractiveButton clicado");
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={cn("transition-all active:scale-95", className)}
      disabled={disabled}
    >
      {children}
    </Button>
  );
} 