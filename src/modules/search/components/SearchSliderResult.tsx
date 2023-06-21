import React, { FC } from 'react'
import { Swiper as SwiperClass } from 'swiper'

import ContentSlider from '@/components/ContentSlider'
import FilmCard from '@/modules/film/components/FilmCard'
import SerialCard from '@/modules/serial/components/SerialCard'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { APIStatus } from '@/app/api'
import { ISearchResultsQueryAttr } from '@/modules/search/search.actions'
import { ISearchPagination, PER_PAGE, setSearchResultsPagination } from '../search.slice'
import { ContentType } from '@/models/content'
import { IFilm } from '@/modules/film/film.model'
import { ISerial } from '@/modules/serial/serial.model'
import { searchEmitter, SearchEvents } from '../search.emitter'

interface SearchSliderResultProps {
  query: ISearchResultsQueryAttr
  onLoadMore: (pagination: ISearchPagination, query?: ISearchResultsQueryAttr) => void
}

const SearchSliderResult: FC<SearchSliderResultProps> = ({ onLoadMore }) => {
  const dispatch = useAppDispatch()
  const { search } = useAppSelector((state) => state.search)

  const handleNavigationNext = async (swiper: SwiperClass) => {
    const { currentPage, cacheCurrentPage } = search.pagination
    const newCurrentPage = currentPage + 1

    const pagination = { ...search.pagination, currentPage: newCurrentPage }

    if (newCurrentPage <= cacheCurrentPage) {
      dispatch(setSearchResultsPagination(pagination))
      return
    }

    if (swiper.realIndex === PER_PAGE) onLoadMore?.(pagination, { limit: PER_PAGE })
    else {
      const offset = (pagination.currentPage - 1) * pagination.perPage
      onLoadMore?.(pagination, { offset: offset + PER_PAGE })
    }
  }

  const handleNavigationPrev = () => {
    const { currentPage } = search.pagination
    if (currentPage > 1) dispatch(setSearchResultsPagination({ currentPage: currentPage - 1 }))
  }

  const handleClick = () => searchEmitter.emit(SearchEvents.SEARCH_MODAL_CLOSE)

  if (!search.items || !search.items.length) return null

  return (
    <ContentSlider
      title={`Результаты поиска: ${search.pagination.totalItems}`}
      items={search.items}
      itemRenderFn={(item) => {
        const contentType = item.content_type_ptr
        if (contentType === ContentType.FILM) {
          return <FilmCard item={item as IFilm} onClick={handleClick} />
        }
        if (contentType === ContentType.SERIAL) {
          return <SerialCard item={item as ISerial} onClick={handleClick} />
        }
        return null
      }}
      loading={search.status === APIStatus.PENDING}
      swiperProps={{
        allowTouchMove: false,
        slidesPerView: PER_PAGE,
        slidesPerGroup: PER_PAGE,
        onNavigationNext: handleNavigationNext,
        onNavigationPrev: handleNavigationPrev,
      }}
    />
  )
}

export default SearchSliderResult
