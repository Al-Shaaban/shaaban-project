import type { PropsWithChildren } from 'react'
import CrossIcon from '~icons/cross'
import { Button } from '~ui/button'
import { Dialog, DialogContent, type DialogProps } from '~ui/dialog'
import { cn } from '~utils/functions/misc.functions'

export function DialogEmpty({
  open,
  children,
  className,
  onToggleModal,
  onPointerDownOutside
}: PropsWithChildren<DialogProps>) {
  return (
    <Dialog open={open} onOpenChange={onToggleModal}>
      <DialogContent
        className={cn(
          className,
          'max-h-[70vh] gap-1 overflow-auto border-none bg-white p-0'
        )}
        onPointerDownOutside={onPointerDownOutside}
      >
        {children}
        <Button
          variant={'outline'}
          size={'icon'}
          className={'absolute right-3 top-3'}
          onClick={onToggleModal}
        >
          <CrossIcon />
        </Button>
      </DialogContent>
    </Dialog>
  )
}
