'use client'

import { useState, type ReactElement } from 'react'
import CalendarIcon from '~icons/calendar'
import { Button, buttonVariants } from '~ui/button'
import { Calendar } from '~ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '~ui/popover'
import { cn } from '~utils/functions/misc.functions'
import { format } from 'date-fns'
import type { DateRange } from 'react-day-picker'

interface InputDateRangeProps {
  value?: Date
  label?: string
  icon?: ReactElement
  isRight?: boolean
  disabled?: boolean
  className?: string
  onChange?: (value: DateRange | undefined) => void
}

const InputDateRange = ({ label = 'Pick a date', ...props }: InputDateRangeProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full text-left font-normal',
            !props.value && 'text-muted-foreground',
            {
              'flex-row-reverse justify-between': props.isRight,
              'flex-row justify-start': !props.isRight
            },
            props.className
          )}
          disabled={props.disabled}
        >
          {props.icon ? props.icon : <CalendarIcon className={'mr-2 h-4 w-4'} />}
          {props.value ? format(props.value, 'PPP') : <span>{label}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={'w-auto p-0'}>
        <Calendar
          initialFocus
          mode={'range'}
          onSelect={props.onChange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}

InputDateRange.displayName = 'Input Date Range'

export { InputDateRange }
