import type { InputHTMLAttributes } from 'react'
import { cva } from 'class-variance-authority'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export const inputVariants = cva(
  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      type: {
        text: '',
        number: 'overflow-y-hidden'
      }
    },
    defaultVariants: {
      type: 'text'
    }
  }
)
