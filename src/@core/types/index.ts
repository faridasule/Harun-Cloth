export interface PagedRequest {
  name: string
}

export interface ProductType {
  id: number
  title: string
  price?: string
  category?: string
  description?: string
  image?: string
  cartQuantity?: number
}

export type CreateUser = {
    fullName?: string
    emailAddress: string
    password: string
}