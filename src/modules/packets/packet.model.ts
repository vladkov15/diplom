interface IFeature {
  label: string
  value: boolean
}

export interface IPacket {
  id: number
  autopay: boolean
  days: string
  description: string
  short_description: string
  discount_amount: string
  discount_percent: string
  expire_date: string | null
  image: string
  name: string
  price: string
  promo_image: string
  ut_expire_date: string | null
  ut_start_date: string | null
  features: IFeature[] | null
}
