import { ContentType } from '@/models/content'
import { useEffect, useState } from 'react'

import { useAddToFavoritesMutation, useDeleteFromFavoritesMutation } from '../favorite.api'
import { favoriteEmitter, FavoriteEvents, ToggleFavoriteEvent } from '../favorite.emitter'

interface UseFavoriteEvents {
  onAddFavorite?: (event: ToggleFavoriteEvent) => void
  onDeleteFavorite?: (event: ToggleFavoriteEvent) => void
}

export function useFavorite(initialFavorites: number, events?: UseFavoriteEvents) {
  const [favorites, setFavorites] = useState(initialFavorites)

  const [addToFavorites] = useAddToFavoritesMutation()
  const [deleteFromFavorites] = useDeleteFromFavoritesMutation()

  const handleAddFavorite = (event: ToggleFavoriteEvent) => events?.onAddFavorite?.(event)

  const handleDeleteFavorite = (event: ToggleFavoriteEvent) => events?.onDeleteFavorite?.(event)

  useEffect(() => {
    favoriteEmitter.on(FavoriteEvents.ADD_FAVORITE, handleAddFavorite)
    favoriteEmitter.on(FavoriteEvents.DELETE_FAVORITE, handleDeleteFavorite)

    return () => {
      favoriteEmitter.off(FavoriteEvents.ADD_FAVORITE, handleAddFavorite)
      favoriteEmitter.off(FavoriteEvents.DELETE_FAVORITE, handleDeleteFavorite)
    }
  }, [])

  const toggleFavorites = async (id: number, contentType: ContentType) => {
    const oldFavorites = favorites
    const newFavorites = oldFavorites === 1 ? 0 : 1

    try {
      const params = { item_ptr: id, content_type_ptr: contentType }

      if (oldFavorites) {
        await deleteFromFavorites(params).unwrap()
        favoriteEmitter.emit(FavoriteEvents.DELETE_FAVORITE, { id, contentType })
      } else {
        await addToFavorites(params).unwrap()
        favoriteEmitter.emit(FavoriteEvents.ADD_FAVORITE, { id, contentType })
      }

      setFavorites(newFavorites)
    } catch (e) {}
  }

  return { favorites, setFavorites, toggleFavorites }
}
