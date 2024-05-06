import { forwardRef, type ButtonHTMLAttributes, type PropsWithChildren } from 'react'
import CircleThreeQuartedIcon from '~icons/circle-three-quartered'
import type { IconType } from '~types/icons'
import { cn } from '~utils/functions/misc.functions'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'flex gap-1 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'fill-primary-foreground bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'fill-destructive-foreground bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'fill-secondary-foreground border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'fill-secondary-foreground bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'fill-secondary-foreground hover:bg-accent hover:text-accent-foreground',
        link: 'fill-primary text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

interface ButtonVariantType extends VariantProps<typeof buttonVariants> {}

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren<ButtonVariantType> {
  label?: string
  loading?: boolean
  icon?: (props: IconType) => JSX.Element
  loadingIcon?: (props: IconType) => JSX.Element
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      type = 'button',
      loading,
      icon: Icon,
      loadingIcon: LoadingIcon,
      label,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        type={type}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {loading ? (
          LoadingIcon ? (
            <LoadingIcon className={'h-4 w-4'} />
          ) : (
            <CircleThreeQuartedIcon className={'w-6 animate-spin'} />
          )
        ) : (
          Icon && <Icon className={'h-4 w-4'} />
        )}

        {label ? label : children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
