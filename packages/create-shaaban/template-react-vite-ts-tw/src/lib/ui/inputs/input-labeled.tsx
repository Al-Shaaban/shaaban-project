import { forwardRef, type ReactElement } from 'react'
import { buttonVariants } from '~ui/button'
import { cn } from '~utils/functions/misc.functions'

import { inputVariants, type InputProps } from '.'

interface InputLabeledProps extends InputProps {
  label: string | ReactElement
  isRight?: boolean
}

const InputLabeled = forwardRef<HTMLInputElement, InputLabeledProps>(
  ({ className, label, isRight, ...props }, ref) => {
    return (
      <div className={'relative flex items-center gap-0'}>
        <span
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'icon' }),
            'absolute w-[30px] fill-muted-foreground text-muted-foreground hover:bg-transparent hover:fill-muted-foreground hover:text-muted-foreground',
            { 'left-0 ml-[10px]': !isRight },
            { 'right-0 mr-[10px]': isRight }
          )}
        >
          {label}
        </span>

        <input
          className={cn(
            inputVariants({ type: 'text', className }),
            { 'pl-10': !isRight },
            { 'pr-10': isRight }
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
InputLabeled.displayName = 'Input Text'

export { InputLabeled }
