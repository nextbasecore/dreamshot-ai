"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        // Base sizes for mobile (slightly larger than before)
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        // Responsive sizes: larger on medium and large screens
        "md:h-6 md:w-11 lg:h-7 lg:w-14",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          // Base thumb size for mobile
          "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform",
          // Responsive thumb sizes
          "md:size-5 lg:size-6",
          // Translation calculations for different sizes
          // Mobile: w-9 (36px) - size-4 (16px) - 2px padding = 18px
          "data-[state=checked]:translate-x-[18px] data-[state=unchecked]:translate-x-0.5",
          // Medium: w-11 (44px) - size-5 (20px) - 2px padding = 22px
          "md:data-[state=checked]:translate-x-[22px] md:data-[state=unchecked]:translate-x-0.5",
          // Large: w-14 (56px) - size-6 (24px) - 2px padding = 30px
          "lg:data-[state=checked]:translate-x-[30px] lg:data-[state=unchecked]:translate-x-0.5"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
