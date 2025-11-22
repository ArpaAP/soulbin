'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import * as SelectPrimitive from '@radix-ui/react-select';

// Triangle Icon matching Figma design
function TriangleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14 10.5L20.125 17.5H7.875L14 10.5Z" fill="currentColor" />
    </svg>
  );
}

interface OutlinedSelectProps extends React.ComponentProps<typeof SelectPrimitive.Root> {
  label: string;
  error?: string;
  className?: string;
  triggerClassName?: string;
}

function OutlinedSelect({
  label,
  error,
  className,
  triggerClassName,
  children,
  value,
  onValueChange,
  ...props
}: OutlinedSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(value);

  React.useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const hasValue = Boolean(internalValue);
  const isFloating = open || hasValue;

  const handleValueChange = (newValue: string) => {
    setInternalValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <div className={cn('relative w-full', className)}>
      <SelectPrimitive.Root
        value={internalValue}
        onValueChange={handleValueChange}
        open={open}
        onOpenChange={setOpen}
        {...props}
      >
        <SelectPrimitive.Trigger
          className={cn(
            'pl-g4 rounded-br2 relative flex h-[50px] w-full cursor-pointer items-center border-[1.5px] bg-white pr-[50px] transition-all outline-none',
            // Border colors
            error
              ? 'border-error border'
              : open || hasValue
                ? 'border-primary-green border'
                : 'border-gray-border border',
            // Text color
            hasValue ? 'text-black' : 'text-transparent',
            'text-l1 font-medium',
            triggerClassName
          )}
        >
          <SelectPrimitive.Value />

          {/* Dropdown Button with Divider */}
          <div
            className={cn(
              'rounded-tr-br2 rounded-br-br2 absolute top-0 right-0 bottom-0 flex w-[50px] items-center justify-center border-l-[1.5px] bg-white',
              error
                ? 'border-error'
                : open || hasValue
                  ? 'border-primary-green'
                  : 'border-gray-border'
            )}
          >
            <SelectPrimitive.Icon asChild>
              <TriangleIcon
                className={cn(
                  'size-7 shrink-0 transition-all duration-200',
                  open ? 'text-primary-green rotate-0' : 'rotate-180 text-gray-400'
                )}
              />
            </SelectPrimitive.Icon>
          </div>
        </SelectPrimitive.Trigger>

        {/* Floating Label */}
        <label
          className={cn(
            'pointer-events-none absolute transition-all duration-200 ease-out',
            isFloating
              ? [
                  '-top-px left-[15px] -translate-y-1/2',
                  'bg-white px-1',
                  'text-[13px] leading-[18px] font-normal tracking-[-0.32px]',
                  error ? 'text-error' : 'text-primary-green',
                ]
              : ['left-g4 top-1/2 -translate-y-1/2', 'text-l1 font-medium', 'text-gray-text']
          )}
        >
          {label}
        </label>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={cn(
              'rounded-br3 relative z-50 max-h-96 w-[300px] overflow-hidden bg-white shadow-[0px_3px_10px_2px_rgba(0,0,0,0.1)]',
              'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95'
            )}
            position="popper"
            sideOffset={10}
          >
            <SelectPrimitive.Viewport className="p-g2 flex flex-col gap-[0px]">
              {children}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {/* Error Message */}
      {error && (
        <p className="text-c1 text-error absolute bottom-[-11px] left-2.5 translate-y-1/2">
          {error}
        </p>
      )}
    </div>
  );
}

function OutlinedSelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        'px-g3 py-g0 text-l2 rounded-br1 relative flex h-10 w-full cursor-pointer items-center gap-2.5 overflow-clip bg-white font-medium transition-colors outline-none select-none',
        'hover:bg-[#f8f9fb]',
        'focus:bg-[#f8f9fb]',
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function OutlinedSelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group {...props} />;
}

function OutlinedSelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      className={cn('px-2 py-1.5 text-xs font-semibold', className)}
      {...props}
    />
  );
}

export { OutlinedSelect, OutlinedSelectItem, OutlinedSelectGroup, OutlinedSelectLabel };
