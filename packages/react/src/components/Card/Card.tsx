import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  type ElementType,
  type ComponentPropsWithoutRef,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const cardVariants = cva(
  // Base styles
  ['rounded-lg overflow-hidden transition-all duration-fast'],
  {
    variants: {
      variant: {
        elevated: 'bg-white shadow-md hover:shadow-lg',
        outlined: 'bg-white border border-neutral-200',
        filled: 'bg-neutral-100',
      },
      padding: {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
      },
      interactive: {
        true: 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'elevated',
      padding: 'md',
      interactive: false,
    },
  }
);

export type CardVariant = 'elevated' | 'outlined' | 'filled';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

type PolymorphicRef<T extends ElementType> = ComponentPropsWithoutRef<T>['ref'];

export interface CardProps<T extends ElementType = 'div'>
  extends Omit<HTMLAttributes<HTMLElement>, 'onClick'>,
    VariantProps<typeof cardVariants> {
  /** The element type to render as */
  as?: T;
  /** The card variant */
  variant?: CardVariant;
  /** The card padding */
  padding?: CardPadding;
  /** Whether the card is interactive (clickable) */
  interactive?: boolean;
  /** Click handler for interactive cards */
  onClick?: () => void;
  /** Card header content */
  header?: ReactNode;
  /** Card footer content */
  footer?: ReactNode;
  /** The card content */
  children?: ReactNode;
}

/**
 * A customizable card component with multiple variants
 *
 * @example
 * ```tsx
 * <Card variant="elevated" padding="md">
 *   <h2>Card Title</h2>
 *   <p>Card content goes here</p>
 * </Card>
 *
 * <Card
 *   variant="outlined"
 *   interactive
 *   onClick={() => console.log('clicked')}
 *   header={<h3>Header</h3>}
 *   footer={<Button>Action</Button>}
 * >
 *   Card body content
 * </Card>
 * ```
 */
function CardComponent<T extends ElementType = 'div'>(
  {
    as,
    className,
    variant = 'elevated',
    padding = 'md',
    interactive = false,
    onClick,
    header,
    footer,
    children,
    ...props
  }: CardProps<T>,
  ref: PolymorphicRef<T>
) {
  const Component = as || 'div';
  const isInteractive = interactive || Boolean(onClick);

  const handleClick = () => {
    if (isInteractive && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isInteractive && onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  // Determine padding class for inner sections
  const paddingClass = {
    none: '',
    sm: 'px-3',
    md: 'px-4',
    lg: 'px-6',
  }[padding || 'md'];

  const hasHeaderOrFooter = header || footer;

  return (
    <Component
      ref={ref}
      className={cn(
        cardVariants({ variant, padding: hasHeaderOrFooter ? 'none' : padding, interactive: isInteractive }),
        className
      )}
      onClick={isInteractive ? handleClick : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      {...props}
    >
      {header && (
        <div
          className={cn(
            'border-b border-neutral-200',
            paddingClass,
            padding === 'sm' ? 'py-2' : padding === 'lg' ? 'py-4' : 'py-3'
          )}
        >
          {header}
        </div>
      )}

      <div
        className={cn(
          hasHeaderOrFooter && paddingClass,
          hasHeaderOrFooter && (padding === 'sm' ? 'py-3' : padding === 'lg' ? 'py-6' : 'py-4')
        )}
      >
        {children}
      </div>

      {footer && (
        <div
          className={cn(
            'border-t border-neutral-200',
            paddingClass,
            padding === 'sm' ? 'py-2' : padding === 'lg' ? 'py-4' : 'py-3'
          )}
        >
          {footer}
        </div>
      )}
    </Component>
  );
}

// Use forwardRef with type assertion to preserve generic type
export const Card = forwardRef(CardComponent) as <T extends ElementType = 'div'>(
  props: CardProps<T> & { ref?: PolymorphicRef<T> }
) => JSX.Element;

(Card as any).displayName = 'Card';

export default Card;

