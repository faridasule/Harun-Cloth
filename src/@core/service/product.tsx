import { get } from '../api'

export const getAllProducts = async () => {
  try {
    const response = await get('products')
    return response
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export const getAllCategories = async () => {
  try {
    const response = await get('products/categories')

    return response
  } catch (error) {
    throw error
  }
}

export const getProductByCategory = async (category: string) => {
  try {
    const response = await get(`products/category/${category}`)

    return response
  } catch (error) {
    throw error
  }
}

export const getProduct = async (id: number) => {
  try {
    const response = await get(`products/${id}`)

    return response
  } catch (error) {
    throw error
  }
}
