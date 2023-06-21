import { IChannelCategory } from '../channel/channel.model'

export enum ChildrenCategories {
  BABY = 1,
  SCHOOLBOY = 2,
  TEENAGER = 3,
}

export interface IChildrenCategory extends IChannelCategory {
  available: string
}
