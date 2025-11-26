import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const inputVariants = cva(
  // Base styles
  [
    'w-full rounded-md border bg-white',
    'font-normal text-neutral-900',
    'placeholder:text-neutral-400',
    'transition-all duration-fast',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-100',
  ],
  {
    variants: {
      size: {
        sm: 'px-3 py-1.5 text-sm min-h-[32px]',
        md: 'px-4 py-2 text-base min-h-[40px]',
        lg: 'px-4 py-3 text-lg min-h-[48px]',
      },
      hasError: {
        true: 'border-error-500 focus:ring-error-500 focus:border-error-500',
        false: 'border-neutral-200',
      },
    },
    defaultVariants: {
      size: 'md',
      hasError: false,
    },
  }
);

const labelVariants = cva('block font-medium text-neutral-700 mb-1.5', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type InputSize = 'sm' | 'md' | 'lg';
export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'search';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof inputVariants> {
  /** The input type */
  type?: InputType;
  /** The input size */
  size?: InputSize;
  /** Label text for the input */
  label?: ReactNode;
  /** Helper text displayed below the input */
  helper?: ReactNode;
  /** Error message displayed below the input */
  error?: ReactNode;
  /** Content to render at the start of the input */
  startAdornment?: ReactNode;
  /** Content to render at the end of the input */
  endAdornment?: ReactNode;
}

/**
 * A customizable input component with label and error states
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   helper="We'll never share your email"
 * />
 *
 * <Input
 *   label="Password"
 *   type="password"
 *   error="Password must be at least 8 characters"
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      size = 'md',
      label,
      helper,
      error,
      startAdornment,
      endAdornment,
      disabled,
      required,
      id: providedId,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;

    const hasError = Boolean(error);
    const describedByIds = [
      ariaDescribedBy,
      helper && !hasError ? helperId : null,
      hasError ? errorId : null,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className={labelVariants({ size })}>
            {label}
            {required && (
              <span className="text-error-500 ml-0.5" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          {startAdornment && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
              {startAdornment}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            type={type}
            disabled={disabled}
            required={required}
            aria-invalid={hasError}
            aria-describedby={describedByIds || undefined}
            className={cn(
              inputVariants({ size, hasError }),
              startAdornment && 'pl-10',
              endAdornment && 'pr-10',
              className
            )}
            {...props}
          />

          {endAdornment && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500">
              {endAdornment}
            </div>
          )}
        </div>

        {helper && !hasError && (
          <p id={helperId} className="mt-1.5 text-sm text-neutral-500">
            {helper}
          </p>
        )}

        {hasError && (
          <p id={errorId} className="mt-1.5 text-sm text-error-500" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

