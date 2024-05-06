'use client'

import { forwardRef, useState } from 'react'
import EyeNoneIcon from '~icons/eye-none'
import EyeOpenIcon from '~icons/eye-open'
import { Button } from '~ui/button'
import { cn } from '~utils/functions/misc.functions'

import { inputVariants, type InputProps } from '.'

interface InputPasswordProps extends InputProps {
  displayIcons?: boolean
}

const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, displayIcons = true, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false)
    return (
      <div className={'relative flex items-center'}>
        <input
          type={isVisible ? 'text' : 'password'}
          className={cn(inputVariants({ type: 'number', className }))}
          ref={ref}
          inputMode={'numeric'}
          {...props}
        />

        <Button
          variant={'ghost'}
          size={'icon'}
          className={cn(
            'absolute right-[10px] h-[30px] w-[30px] rounded-full border-0 bg-transparent fill-muted-foreground p-0 shadow-none'
          )}
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? <EyeOpenIcon /> : <EyeNoneIcon />}
        </Button>
      </div>
    )
  }
)
InputPassword.displayName = 'Input Password'

export { InputPassword }
