import { v4 as uuid } from 'uuid'
import { IUrl as IRawUrl } from '@/models/content'

export interface IUrl {
  id: string
  language: {
    id: string
    value: string
    label: string
  }
  resolutions: Array<{
    id: string
    value: string
    label: string
    url: string
  }>
}

export class PlayerUrlManager {
  static #instance: PlayerUrlManager | null = null

  #urls: IUrl[] = []

  constructor(rawUrls?: IRawUrl[]) {
    if (rawUrls) this.#urls = this.#prepareUrls(rawUrls)
  }

  static getInstance(urls?: IRawUrl[]) {
    if (!this.#instance) this.#instance = new PlayerUrlManager(urls)
    return this.#instance
  }

  setUrls(rawUrl: IRawUrl[]) {
    this.#urls = this.#prepareUrls(rawUrl)
  }

  getUrls() {
    return this.#urls
  }

  #getLanguageCode(language: string) {
    switch (language) {
      case 'Русский':
        return 'ru'
      case 'Английский':
        return 'en'
      default:
        return language
    }
  }

  #prepareUrls(urls: IRawUrl[]) {
    type TempUrl = { url: string; language: string; resolution: string }
    const tempCb = (acc: TempUrl[], url: IRawUrl): TempUrl[] => {
      const tempUrls = url.resolutions.map((resolution) => ({
        url: resolution.url,
        language: url.lang,
        resolution: resolution.name,
      }))
      return [...acc, ...tempUrls]
    }
    let tempUrls = urls.reduce(tempCb, [])
    tempUrls = tempUrls.filter((tempUrl) => tempUrl.resolution && tempUrl.url) // Delete empty URLs
    tempUrls = [...new Map(tempUrls.map((tempUrl) => [tempUrl.url, tempUrl])).values()] // Delete duplicate by URL field

    const prepareCb = (prepareUrls: IUrl[], tempUrl: TempUrl, _: number, tempUrls: TempUrl[]) => {
      const url = prepareUrls.find((prepareUrl) => prepareUrl.language.label === tempUrl.language)
      if (url) return prepareUrls

      const resolutions = tempUrls.filter(({ language }) => tempUrl.language === language)

      const prepareUrl = {
        id: uuid(),
        language: {
          id: uuid(),
          value: this.#getLanguageCode(tempUrl.language),
          label: tempUrl.language,
        },
        resolutions: resolutions.map(({ resolution, url }) => ({
          id: uuid(),
          value: resolution,
          label: `${resolution}p`,
          url,
        })),
      }

      return [...prepareUrls, prepareUrl]
    }
    return tempUrls.reduce(prepareCb, [])
  }

  getLanguages() {
    return this.#urls.map(({ language }) => language).filter((language) => !!language.value)
  }

  getUrlByIndex(index: number) {
    if (index < 0 && index > this.#urls.length - 1) return null

    return this.#urls[index]
  }

  getFirstUrl() {
    return this.getUrlByIndex(0)
  }

  getResolutionsByLanguageId(id: string) {
    const url = this.#urls.find((url) => url.language.id === id)
    if (!url) return []

    return url.resolutions
  }
}
