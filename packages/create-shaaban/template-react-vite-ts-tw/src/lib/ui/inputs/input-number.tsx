import { forwardRef } from 'react'
import TriangleDownIcon from '~icons/triangle-down'
import TriangleUpIcon from '~icons/triangle-up'
import { cn } from '~utils/functions/misc.functions'

import { inputVariants, type InputProps } from '.'

interface InputNumberProps extends InputProps {
  displayIcons?: boolean
  onIncrement?: () => void
  onDecrement?: () => void
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  ({ className, displayIcons = true, onIncrement, onDecrement, ...props }, ref) => {
    return (
      <div className={'relative flex items-center'}>
        <input
          type={'number'}
          className={cn(inputVariants({ type: 'number', className }))}
          ref={ref}
          inputMode={'numeric'}
          {...props}
        />

        {displayIcons && (
          <div className={'absolute right-5 flex h-full flex-col justify-between py-1.5'}>
            <TriangleUpIcon
              className={'cursor-pointer fill-muted-foreground duration-150'}
              onClick={onIncrement}
            />

            <TriangleDownIcon
              className={'cursor-pointer fill-muted-foreground'}
              onClick={onDecrement}
            />
          </div>
        )}
      </div>
    )
  }
)
InputNumber.displayName = 'Input Number'

export { InputNumber }
