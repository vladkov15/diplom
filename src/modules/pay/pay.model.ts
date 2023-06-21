export interface IPaymentHistory {
  date: string
  image: string
  price: string
  promo_image: string
  title: string
  ut_date: string
}

export interface IPayCard {
  image: string
  card_holder: string
  brand: string
  card: string
}

export interface ICreditCard {
  holder?: string | null
  stamp: string
  brand: string
  last_4: string
  first_1: string
  bin: string
  issuer_country: string
  issuer_name: string
  product: string
  exp_month: number
  exp_year: number
  token_provider?: string | null
  token: string
}

export interface IGateway {
  iframe: boolean
}

export interface IAdditionalData {
  receipt_text: string[] | null
  contract: string[]
  meta: string[] | null
}

export interface IWhiteBlackList {
  email: string
  ip: string
  card_number: string
}

export interface IBeProtectedVerification {
  status: string
  message?: string | null
  white_black_list: IWhiteBlackList
  rules: { [key: string]: string }
}

export interface IPayment {
  auth_code: string
  bank_code: string
  rrn: string
  ref_id: string
  message: string
  amount: number
  currency: string
  billing_descriptor: string
  gateway_id: number
  status: string
}

export interface IAVSVerification {
  result_code: string
}

export interface ICVCVerification {
  result_code: string
}

export interface Avs_cvc_verification {
  avs_verification: IAVSVerification
  cvc_verification: ICVCVerification
}

export interface ICustomer {
  ip: string
  email: string
  device_id?: string | null
  birth_date?: string | null
}

export interface IBillingAddress {
  first_name?: string | null
  last_name?: string | null
  address?: string | null
  country?: string | null
  city?: string | null
  zip?: string | null
  state?: string | null
  phone: string
}

export interface ITransaction {
  uid: string
  status: string
  amount: number
  currency: string
  description: string
  type: string
  payment_method_type: string
  tracking_id: string
  message: string
  test: boolean
  created_at: string
  updated_at: string
  paid_at: string
  expired_at?: string | null
  recurring_type: string
  closed_at?: string | null
  settled_at?: string | null
  manually_corrected_at?: string | null
  language: string
  credit_card: ICreditCard
  receipt_url: string
  status_code?: string | null
  gateway: IGateway
  id: string
  additional_data: IAdditionalData
  redirect_url: string
  be_protected_verification: IBeProtectedVerification
  payment: IPayment
  avs_cvc_verification: Avs_cvc_verification
  customer: ICustomer
  billing_address: IBillingAddress
}
