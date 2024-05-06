import { useCallback, useState } from 'react'

type DialogState<T extends string> = Record<T, boolean>

export function useDialog<T extends string, U = void>(initialState: T[]) {
  const [data, setData] = useState<U>()

  const initialDialogState: DialogState<T> = initialState.reduce(
    (acc, dialogId) => ({ ...acc, [dialogId]: false }),
    {} as DialogState<T>
  )

  const [dialogState, setDialogState] = useState<DialogState<T>>(initialDialogState)
  const toggleDialog = useCallback((dialogId: T, data?: U, state?: boolean) => {
    setData(data)
    setDialogState((prevState) => {
      if (!prevState) return prevState

      return {
        ...prevState,
        [dialogId]: typeof state !== 'undefined' ? state : !prevState[dialogId]
      }
    })
  }, [])

  return { data, dialogState, toggleDialog }
}
