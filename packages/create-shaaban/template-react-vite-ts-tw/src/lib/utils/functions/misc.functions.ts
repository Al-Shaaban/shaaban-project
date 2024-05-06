import { QueryClient } from '@tanstack/react-query'
import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
