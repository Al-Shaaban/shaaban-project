import type { ComponentProps, ReactElement } from 'react'
import { useCallback, useRef } from 'react'
import { Button, CopyToClipboard } from 'nextra/components'
import { WordWrapIcon } from 'nextra/icons'

import { Javascript, Json, Typescript } from './icons'

function cn(...classes: Array<string | boolean | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export const Pre = ({
  children,
  className,
  hasCopyCode,
  filename,
  ...props
}: ComponentProps<'pre'> & {
  filename?: string
  hasCopyCode?: boolean
  'data-language'?: string
}): ReactElement => {
  const preRef = useRef<HTMLPreElement | null>(null)

  const toggleWordWrap = useCallback(() => {
    const htmlDataset = document.documentElement.dataset
    const hasWordWrap = 'nextraWordWrap' in htmlDataset
    if (hasWordWrap) {
      // biome-ignore lint/performance/noDelete: <explanation>
      delete htmlDataset.nextraWordWrap
    } else {
      htmlDataset.nextraWordWrap = ''
    }
  }, [])

  const language = props['data-language'] ?? ''
  const Icon = {
    js: Javascript,
    jsx: Javascript,
    ts: Typescript,
    tsx: Typescript,
    json: Json
  }[language]

  return (
    <div className="nextra-code-block relative mt-6 first:mt-0">
      {filename && (
        <>
          <div className="bg-primary-700/5 dark:bg-primary-300/10 absolute top-0 z-[1] flex w-full items-center justify-between truncate rounded-t-xl px-4 py-2 text-xs text-gray-700 dark:text-gray-200">
            <div className="flex w-full items-center gap-2">
              {Icon && <Icon />}
              <div>{filename}</div>
            </div>
            {hasCopyCode && (
              <CopyToClipboard
                getValue={() => preRef.current?.querySelector('code')?.textContent || ''}
              />
            )}
          </div>
        </>
      )}
      <pre
        className={cn(
          'bg-primary-700/5 dark:bg-primary-300/10 mb-4 overflow-x-auto rounded-xl text-[.9em] font-medium subpixel-antialiased',
          'contrast-more:border-primary-900/20 contrast-more:dark:border-primary-100/40 contrast-more:border contrast-more:contrast-150',
          filename ? 'pb-4 pt-12' : 'py-4',
          className
        )}
        ref={preRef}
        {...props}
      >
        {children}
      </pre>
      <div
        className={cn(
          'opacity-0 transition focus-within:opacity-100 [div:hover>&]:opacity-100',
          'absolute right-0 m-[11px] flex gap-1',
          filename ? 'top-8' : 'top-0'
        )}
      >
        <Button onClick={toggleWordWrap} className="md:hidden" title="Toggle word wrap">
          <WordWrapIcon className="pointer-events-none h-4 w-4" />
        </Button>
        {hasCopyCode && !filename && (
          <CopyToClipboard
            getValue={() => preRef.current?.querySelector('code')?.textContent || ''}
          />
        )}
      </div>
    </div>
  )
}
