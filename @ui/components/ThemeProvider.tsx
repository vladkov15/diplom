import React, { useContext, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

export const DEFAULT_BREAKPOINTS = {
  xxl: 1400,
  xl: 1200,
  lg: 992,
  md: 768,
  sm: 576,
  xs: 0,
}
export const DEFAULT_MIN_BREAKPOINT = 'xs'

type Breakpoints = { [k in keyof typeof DEFAULT_BREAKPOINTS]: number }
type BreakpointsKeys = keyof Breakpoints

export interface ThemeContextValue {
  prefixes: Record<string, string>
  breakpoints: Breakpoints
  minBreakpoint?: string
  dir?: string
}

export interface ThemeProviderProps extends Partial<ThemeContextValue> {
  children: React.ReactNode
}

const ThemeContext = React.createContext<ThemeContextValue>({
  prefixes: {},
  breakpoints: DEFAULT_BREAKPOINTS,
  minBreakpoint: DEFAULT_MIN_BREAKPOINT,
})
const { Consumer, Provider } = ThemeContext

function ThemeProvider({
  prefixes = {},
  breakpoints = DEFAULT_BREAKPOINTS,
  minBreakpoint = DEFAULT_MIN_BREAKPOINT,
  dir,
  children,
}: ThemeProviderProps) {
  const contextValue = useMemo(
    () => ({ prefixes: { ...prefixes }, breakpoints, minBreakpoint, dir }),
    [prefixes, breakpoints, minBreakpoint, dir],
  )

  return <Provider value={contextValue}>{children}</Provider>
}

ThemeProvider.propTypes = {
  prefixes: PropTypes.object,
  breakpoints: PropTypes.arrayOf(PropTypes.string),
  minBreakpoint: PropTypes.string,
  dir: PropTypes.string,
}

export function usePrefix(prefix: string | undefined, defaultPrefix: string): string {
  const { prefixes } = useContext(ThemeContext)
  return prefix || prefixes[defaultPrefix] || defaultPrefix
}

export function useBreakpointsMedia(variant: 'max' | 'min' = 'min') {
  const { breakpoints } = useContext(ThemeContext)

  const getMatches = (query: string): boolean => window.matchMedia(query).matches

  const getQueries = () => {
    const keys = Object.keys(breakpoints) as BreakpointsKeys[]
    return keys.map((key) => ({ key, matchQuery: `(${variant}-width: ${breakpoints[key]}px)` }))
  }
  const getMedia = () => {
    if (typeof window === 'undefined') return null

    return queries.reduce((acc, query) => {
      const match = getMatches(query.matchQuery)
      return { ...acc, [query.key]: match }
    }, {}) as Media
  }

  type Query = { key: string; matchQuery: string }
  const [queries, setQueries] = useState<Query[]>(getQueries)

  useEffect(() => {
    setQueries(getQueries)
  }, [breakpoints])

  type Media = { [k in BreakpointsKeys]: boolean }
  const [media, setMedia] = useState<Media | null>(getMedia)

  const handleChange = () => setMedia(getMedia())

  useEffect(() => {
    const matchesMedia = queries.map((query) => window.matchMedia(query.matchQuery))
    handleChange()

    matchesMedia.forEach((matchMedia) => {
      if (matchMedia.addListener) {
        matchMedia.addListener(handleChange)
      } else {
        matchMedia.addEventListener('change', handleChange)
      }
    })

    return () => {
      matchesMedia.forEach((matchMedia) => {
        if (matchMedia.removeListener) {
          matchMedia.removeListener(handleChange)
        } else {
          matchMedia.removeEventListener('change', handleChange)
        }
      })
    }
  }, [queries])

  return media
}

export function useBreakpoints() {
  const { breakpoints } = useContext(ThemeContext)
  return breakpoints
}

export function useMinBreakpoint() {
  const { minBreakpoint } = useContext(ThemeContext)
  return minBreakpoint
}

export function useIsRTL() {
  const { dir } = useContext(ThemeContext)
  return dir === 'rtl'
}

export { Consumer as ThemeConsumer }
export default ThemeProvider
