import { QueryClient } from '@tanstack/react-query'
import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const flat = <T extends { children?: object }>(array: Array<T>) => {
  let result: T[] = []
  for (const a of array) {
    result.push(a)
    if (Array.isArray(a.children)) {
      result = result.concat(flat(a.children))
    }
  }
  return result
}
