import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
    // Base styles
    [
        'inline-flex items-center justify-center gap-2',
        'font-medium rounded-md cursor-pointer',
        'transition-all duration-fast',
        'border-2 border-transparent',
        'whitespace-nowrap',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    ],
    {
        variants: {
            variant: {
                primary: [
                    'bg-primary-500 text-white',
                    'hover:bg-primary-600',
                    'active:bg-primary-700',
                ],
                secondary: [
                    'bg-secondary-500 text-white',
                    'hover:bg-secondary-600',
                    'active:bg-secondary-700',
                ],
                outline: [
                    'bg-transparent border-primary-500 text-primary-500',
                    'hover:bg-primary-50',
                    'active:bg-primary-100',
                ],
                ghost: [
                    'bg-transparent text-neutral-700',
                    'hover:bg-neutral-100',
                    'active:bg-neutral-200',
                ],
                destructive: [
                    'bg-error-500 text-white',
                    'hover:bg-error-700',
                ],
            },
            size: {
                sm: 'px-3 py-1 text-sm min-h-[32px]',
                md: 'px-4 py-2 text-base min-h-[40px]',
                lg: 'px-6 py-3 text-lg min-h-[48px]',
            },
            fullWidth: {
                true: 'w-full',
                false: '',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
            fullWidth: false,
        },
    }
);

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled' | 'prefix'>,
    VariantProps<typeof buttonVariants> {
    /** The button variant */
    variant?: ButtonVariant;
    /** The button size */
    size?: ButtonSize;
    /** Whether the button is disabled */
    disabled?: boolean;
    /** Whether the button is in a loading state */
    loading?: boolean;
    /** Whether the button should take full width */
    fullWidth?: boolean;
    /** Content to render before the main content */
    startIcon?: ReactNode;
    /** Content to render after the main content */
    endIcon?: ReactNode;
    /** The button content */
    children?: ReactNode;
}

/**
 * A customizable button component
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md">
 *   Click me
 * </Button>
 *
 * <Button variant="outline" loading>
 *   Loading...
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'primary',
            size = 'md',
            disabled = false,
            loading = false,
            fullWidth = false,
            startIcon,
            endIcon,
            children,
            type = 'button',
            ...props
        },
        ref
    ) => {
        const isDisabled = disabled || loading;

        return (
            <button
                ref={ref}
                type={type}
                className={cn(buttonVariants({ variant, size, fullWidth }), className)}
                disabled={isDisabled}
                aria-disabled={isDisabled}
                aria-busy={loading}
                {...props}
            >
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    startIcon
                )}
                {children}
                {!loading && endIcon}
            </button>
        );
    }
);

Button.displayName = 'Button';

/**
 * Loading spinner component
 */
function LoadingSpinner() {
    return (
        <span
            className="inline-block w-[1em] h-[1em] border-2 border-current border-r-transparent rounded-full animate-spin"
            aria-hidden="true"
        />
    );
}

export default Button;

