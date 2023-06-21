import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

export type QueuedItem<D> = {
  id: string
  data: D
}

export interface ImmutableQueue<D> {
  add: (id: string, data: D) => ImmutableQueue<D>
  remove: (id: string) => ImmutableQueue<D>
  removeAll: () => ImmutableQueue<D>
  entries: QueuedItem<D>[]
}

export interface QueueHook<D> {
  add: (id: string, data: D) => void
  remove: (id: string) => void
  removeAll: () => void
  entries: QueuedItem<D>[]
}

export function useQueue<D>(initialValue: ImmutableQueue<D>): QueueHook<D> {
  const [{ entries }, setQueue] = useState(initialValue)

  const add = useCallback(
    (id: string, data: D) => {
      setQueue((queue) => queue.add(id, data))
    },
    [setQueue],
  )

  const remove = useCallback(
    (id: string) => {
      setQueue((queue) => queue.remove(id))
    },
    [setQueue],
  )

  const removeAll = useCallback(() => {
    setQueue((queue) => queue.removeAll())
  }, [setQueue])

  return useMemo(() => ({ add, remove, removeAll, entries }), [add, remove, removeAll, entries])
}

export function createImmutableQueue<D>(entries: QueuedItem<D>[] = []): ImmutableQueue<D> {
  return {
    add(id: string, data: D): ImmutableQueue<D> {
      const matchIndex = entries.findIndex((item) => item.id === id)
      const copy = entries.slice()
      if (matchIndex > -1) {
        copy.splice(matchIndex, 1, { id, data })
      } else {
        copy.push({ id, data })
      }
      return createImmutableQueue(copy)
    },
    remove(id: string): ImmutableQueue<D> {
      return createImmutableQueue(entries.filter((item) => item.id !== id))
    },
    removeAll(): ImmutableQueue<D> {
      return createImmutableQueue()
    },
    entries,
  }
}

interface AlertProviderProps<D> {
  queue?: ImmutableQueue<D>
  children: React.ReactNode
}

export function createAlertContext<D>() {
  const AlertQueueContext = createContext<QueueHook<D> | null>(null)

  function useAlertQueue(): QueueHook<D> {
    const queue = useContext(AlertQueueContext)
    if (!queue) throw new Error('Missing <AlertProvider>')
    return queue
  }

  function AlertProvider(props: AlertProviderProps<D>): JSX.Element {
    const { children, queue: initialQueue } = props
    const queue = useQueue<D>(initialQueue ? initialQueue : createImmutableQueue())
    return <AlertQueueContext.Provider value={queue}>{children}</AlertQueueContext.Provider>
  }

  function createAlertQueue() {
    return createImmutableQueue<D>()
  }

  return {
    AlertQueueContext,
    AlertProvider,
    useAlertQueue,
    createAlertQueue,
  }
}
