import { ServerResponse } from 'http'
import Router from 'next/router'

export const shuffle = (array: any[]) => [...array].sort(() => Math.random() - 0.5)

export const isWindowAvailable = () => {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement)
}

export const redirectTo = (location: string, server?: ServerResponse) => {
  if (server) {
    server.writeHead(302, { Location: location })
    server.end()
  } else {
    Router.push(location)
  }
}

export const reloadSession = () => {
  const event = new Event('visibilitychange')
  document.dispatchEvent(event)
}
