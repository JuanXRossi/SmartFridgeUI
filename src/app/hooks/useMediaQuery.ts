import { useSyncExternalStore } from 'react'

export function useMediaQuery(query: string, serverFallback = false): boolean {
  function subscribe(callback: () => void) {
    const mql = window.matchMedia(query)
    mql.addEventListener('change', callback)
    return () => mql.removeEventListener('change', callback)
  }

  function getSnapshot() {
    return window.matchMedia(query).matches
  }

  function getServerSnapshot() {
    return serverFallback
  }

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
