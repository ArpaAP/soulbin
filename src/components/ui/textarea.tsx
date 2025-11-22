'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

interface TextareaProps extends Omit<React.ComponentProps<'textarea'>, 'value' | 'onChange'> {
  label: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  textareaClassName?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      value = '',
      onChange,
      className,
      textareaClassName,
      disabled,
      placeholder,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const hasValue = Boolean(value);
    const isFloating = isFocused || hasValue;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e.target.value);
    };

    return (
      <div className={cn('relative w-full', className)}>
        <div className="relative h-full">
          <textarea
            ref={ref}
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            className={cn(
              'pl-g4 pr-g4 py-g3 rounded-br2 relative flex w-full resize-none border-[1.5px] bg-white transition-all outline-none',
              // Border colors
              error ? 'border-error' : isFocused ? 'border-primary-green' : 'border-gray-border',
              // Text color and style
              hasValue ? 'text-black' : 'text-transparent',
              'text-l1 font-medium',
              // Disabled state
              disabled && 'cursor-not-allowed opacity-50',
              // Default height
              'min-h-[120px]',
              textareaClassName
            )}
            placeholder={placeholder}
            {...props}
          />

          {/* Floating Label */}
          <label
            className={cn(
              'pointer-events-none absolute transition-all duration-200 ease-out',
              isFloating
                ? [
                    '-top-px left-[15px] -translate-y-1/2',
                    'bg-white px-1',
                    'text-[13px] leading-[18px] font-normal tracking-[-0.32px]',
                    error
                      ? 'text-error'
                      : disabled
                        ? 'text-gray-text'
                        : isFocused
                          ? 'text-primary-green'
                          : 'text-gray-text',
                  ]
                : ['left-g4 top-[22px] -translate-y-1/2', 'text-l1 font-medium', 'text-gray-text']
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

Textarea.displayName = 'Textarea';

export { Textarea };
