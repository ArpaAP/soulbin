'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

// Check Icon matching Figma design
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 10.5L8 14.5L16 6.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface CheckboxProps extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  label?: string;
  className?: string;
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ label, className, disabled, id, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;

    return (
      <div className={cn('flex items-center gap-g2', disabled && 'opacity-50', className)}>
        <CheckboxPrimitive.Root
          ref={ref}
          id={checkboxId}
          disabled={disabled}
          className={cn(
            'relative size-5 shrink-0 rounded-br1 border-[1.5px] transition-all',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed',
            // Default state
            'border-gray-border bg-white',
            // Checked state
            'data-[state=checked]:border-primary-green data-[state=checked]:bg-primary-green'
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator className="flex items-center justify-center">
            <CheckIcon className="size-5" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>

        {label && (
          <label
            htmlFor={checkboxId}
            className={cn(
              'text-b3 cursor-pointer select-none font-medium leading-5 text-black',
              disabled && 'cursor-not-allowed'
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
