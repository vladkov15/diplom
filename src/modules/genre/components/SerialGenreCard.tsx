import React, { FC } from 'react'
import { useRouter } from 'next/router'

import { IContentGenre } from '@/models/content'

import ContentGenreCard from '@/components/ContentGenreCard'

interface SerialGenreCardProps {
  item: IContentGenre
}

const SerialGenreCard: FC<SerialGenreCardProps> = ({ item }) => {
  const router = useRouter()

  const handleClick = (item: IContentGenre) => {
    router.push(`/serials/genre/${item.id}`)
  }

  return <ContentGenreCard item={item} onClick={handleClick} />
}

export default SerialGenreCard
