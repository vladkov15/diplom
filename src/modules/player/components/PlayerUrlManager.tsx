import React, { useState, useEffect, useMemo, useCallback } from 'react'

import { IUrl as IRawUrl } from '@/models/content'
import { PlayerUrlManager as PlayerUrlManagerClass } from '../player.url-manager'

export type Resolution = {
  id: string
  value: string
  label: string
  url: string
}

export type Language = {
  id: string
  value: string
  label: string
}

export type UrlState = {
  url: string
  resolution: Resolution | null
  resolutions: Resolution[]
  language: Language | null
  languages: Language[]
}

export type PlayerUrlRenderParameters = UrlState & {
  changeResolution: (resolution: Resolution) => void
  changeLanguage: (language: Language) => void
}

const playerUrlManager = PlayerUrlManagerClass.getInstance()

export interface PlayerUrlManagerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  urls: IRawUrl[] | string | undefined
  children: (params: PlayerUrlRenderParameters) => React.ReactElement
}

const PlayerUrlManager = ({ className, children, ...props }: PlayerUrlManagerProps) => {
  const [state, setState] = useState<UrlState>({
    url: '',
    resolution: null,
    resolutions: [],
    language: null,
    languages: [],
  })

  useEffect(() => {
    if (!props.urls) return

    if (typeof props.urls === 'string') {
      setState((prev) => ({ ...prev, url: props.urls as string }))
      return
    }

    playerUrlManager.setUrls(props.urls)
    const url = playerUrlManager.getFirstUrl()

    if (!url) return

    const resolution = url.resolutions.at(-1) as Resolution
    const resolutions = url.resolutions
    const language = url.language
    const languages = playerUrlManager.getLanguages()

    setState((prev) => ({
      ...prev,
      url: resolution.url,
      resolution,
      resolutions,
      language,
      languages,
    }))
  }, [props.urls])

  const changeResolution = useCallback((resolution: Resolution) => {
    setState((prev) => ({ ...prev, url: resolution.url, resolution }))
  }, [])

  const changeLanguage = useCallback((language: Language) => {
    const resolutions = playerUrlManager.getResolutionsByLanguageId(language.id)
    const resolution = resolutions.at(-1) as Resolution

    setState((prev) => ({ ...prev, url: resolution.url, resolution, resolutions, language }))
  }, [])

  const urlState = useMemo(
    () => ({
      ...state,
      changeResolution,
      changeLanguage,
    }),
    [state, changeResolution, changeLanguage],
  )

  return urlState.url ? children(urlState) : null
}

export default PlayerUrlManager
