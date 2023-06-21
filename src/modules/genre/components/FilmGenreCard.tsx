import React, { FC } from 'react'
import { useRouter } from 'next/router'

import { IContentGenre } from '@/models/content'

import ContentGenreCard from '@/components/ContentGenreCard'

interface FilmGenreCardProps {
  item: IContentGenre
}

const FilmGenreCard: FC<FilmGenreCardProps> = ({ item }) => {
  const router = useRouter()

  const handleClick = (item: IContentGenre) => {
    router.push(`/films/genre/${item.id}`)
  }

  return <ContentGenreCard item={item} onClick={handleClick} />
}

export default FilmGenreCard
