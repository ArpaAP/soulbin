'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

// Clear Icon matching Figma design
function ClearIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.625 9.625L18.375 18.375M18.375 9.625L9.625 18.375"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface OutlinedInputProps extends Omit<React.ComponentProps<'input'>, 'value' | 'onChange'> {
  label: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  className?: string;
  inputClassName?: string;
}

const OutlinedInput = React.forwardRef<HTMLInputElement, OutlinedInputProps>(
  (
    {
      label,
      error,
      value = '',
      onChange,
      onClear,
      className,
      inputClassName,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const hasValue = Boolean(value);
    const isFloating = isFocused || hasValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    const handleClear = () => {
      onChange?.('');
      onClear?.();
    };

    return (
      <div className={cn('relative w-full', className)}>
        <div className="relative">
          <input
            ref={ref}
            type="text"
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            className={cn(
              'pl-g4 rounded-br2 relative flex h-[50px] w-full border-[1.5px] bg-white pr-[50px] transition-all outline-none',
              // Border colors
              error
                ? 'border-error'
                : isFocused
                  ? 'border-primary-green'
                  : 'border-gray-border',
              // Text color and style
              hasValue ? 'text-black' : 'text-transparent',
              'text-l1 font-medium',
              // Disabled state
              disabled && 'cursor-not-allowed opacity-50',
              inputClassName
            )}
            {...props}
          />

          {/* Clear Button */}
          <div
            className={cn(
              'rounded-tr-br2 rounded-br-br2 absolute top-0 right-0 h-full w-[50px] overflow-clip'
            )}
          >
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault(); // Prevent input blur
                handleClear();
              }}
              disabled={disabled}
              className={cn(
                'absolute left-1/2 top-1/2 size-7 -translate-x-1/2 -translate-y-1/2 transition-opacity',
                hasValue && !disabled ? 'opacity-100' : 'pointer-events-none opacity-0',
                'text-gray-400 hover:text-gray-600'
              )}
              aria-label="Clear input"
            >
              <ClearIcon className="size-full" />
            </button>
          </div>

          {/* Floating Label */}
          <label
            className={cn(
              'pointer-events-none absolute transition-all duration-200 ease-out',
              isFloating
                ? [
                    '-top-px left-[15px] -translate-y-1/2',
                    'bg-white px-1',
                    'text-[13px] leading-[18px] font-normal tracking-[-0.32px]',
                    error ? 'text-error' : disabled ? 'text-gray-text' : 'text-primary-green',
                  ]
                : [
                    'left-g4 top-1/2 -translate-y-1/2',
                    'text-l1 font-medium',
                    'text-gray-text',
                  ]
            )}
          >
            {label}
          </label>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-c1 text-error absolute bottom-[-11px] left-2.5 translate-y-1/2">
            {error}
          </p>
        )}
      </div>
    );
  }
);

OutlinedInput.displayName = 'OutlinedInput';

export { OutlinedInput };
