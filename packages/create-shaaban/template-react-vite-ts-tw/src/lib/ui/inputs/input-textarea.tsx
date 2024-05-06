import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '~utils/functions/misc.functions'

import { inputVariants } from '.'

export interface InputTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const InputTextArea = forwardRef<HTMLTextAreaElement, InputTextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(inputVariants({ type: 'text', className }), 'min-h-[60px]')}
        ref={ref}
        {...props}
      />
    )
  }
)
InputTextArea.displayName = 'Input Text Area'

export { InputTextArea }
