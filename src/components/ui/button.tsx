import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-[var(--spacing-g1)] whitespace-nowrap text-l1 font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-[22px] shrink-0 [&_svg]:shrink-0 outline-none relative overflow-hidden cursor-pointer",
  {
    variants: {
      variant: {
        flat: "bg-[var(--color-primary-green)] text-[var(--color-white)] rounded-[var(--border-radius-br2)] before:absolute before:inset-0 before:bg-white before:opacity-0 before:transition-opacity hover:before:opacity-10 active:before:opacity-0 active:after:opacity-10 after:absolute after:inset-0 after:bg-black after:opacity-0 after:transition-opacity",
        outline:
          "border-[1.5px] border-[var(--color-primary-green)] bg-transparent text-[var(--color-primary-green)] rounded-[var(--border-radius-br2)] before:absolute before:inset-0 before:bg-[var(--color-primary-green)] before:opacity-0 before:transition-opacity hover:before:opacity-10 active:before:opacity-20",
        destructive:
          "bg-destructive text-white rounded-[var(--border-radius-br2)] hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        secondary:
          "bg-secondary text-secondary-foreground rounded-[var(--border-radius-br2)] hover:bg-secondary/80",
        ghost:
          "rounded-[var(--border-radius-br2)] hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[50px] px-[var(--spacing-g5)] py-[var(--spacing-g0)]",
        sm: "h-[40px] px-[var(--spacing-g4)] py-[var(--spacing-g0)]",
        lg: "h-[60px] px-[var(--spacing-g5)] py-[var(--spacing-g0)]",
        icon: "size-[50px]",
        "icon-sm": "size-[40px]",
        "icon-lg": "size-[60px]",
      },
    },
    defaultVariants: {
      variant: "flat",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
