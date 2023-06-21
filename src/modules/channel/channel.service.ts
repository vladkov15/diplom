import { ChannelCategories, IChannelCategory } from './channel.model'

const CHANNEL_CATEGORIES_FOR_SSR = [
  ChannelCategories.BELARUS,
  ChannelCategories.INFORMATION,
  ChannelCategories.SPORT,
]

export const getChannelCategoriesForSSR = (
  categories: IChannelCategory[],
  channelCategoriesForSSR = CHANNEL_CATEGORIES_FOR_SSR,
) => {
  return categories.filter((category) => channelCategoriesForSSR.includes(category.id))
}
