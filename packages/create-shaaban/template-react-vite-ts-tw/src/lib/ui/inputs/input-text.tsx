import { forwardRef } from 'react'
import { cn } from '~utils/functions/misc.functions'

import { inputVariants, type InputProps } from '.'

interface InputTextProps extends InputProps {}

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={'relative flex items-center'}>
        <input
          type={'text'}
          className={cn(inputVariants({ type: 'text', className }))}
          ref={ref}
          inputMode={'text'}
          {...props}
        />
      </div>
    )
  }
)
InputText.displayName = 'Input Text'

export { InputText }
