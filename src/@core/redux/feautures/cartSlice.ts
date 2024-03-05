'use client'


// cartSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductType } from '../../types'
import { toast } from 'react-toastify'

type ActionStatus = 'idle' | 'pending' | 'successful' | 'failed'
export type ActionType = 'EDIT' | 'DELETE' | null

export interface ProductState {
  cartItem: ProductType[] // Specify the type of elements in the array
  action: ActionType
  status: ActionStatus
  message: string
  cartTotalAmount: number
  cartTotalQuantity: number
}

const localStorageCartItems = typeof window !== 'undefined' ? localStorage.getItem('cartItem') : null;
const initialCartItems: ProductType[] = localStorageCartItems ? JSON.parse(localStorageCartItems) : [];


const initialState: ProductState = {
  cartItem: initialCartItems,
  action: null,
  cartTotalAmount: 0,
  status: 'idle',
  message: '',
  cartTotalQuantity: 0,
}

export const cartSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const itemIndex = state.cartItem.findIndex(
        (item) => item.id === action.payload.id,
      )

      if (itemIndex >= 0) {
        state.cartItem[itemIndex].cartQuantity! += 1
        toast.info('increase product quantity', {
          position: 'bottom-left',
        })
      } else {
        const eactProduct = { ...action.payload, cartQuantity: 1 }
        state.cartItem.push(eactProduct)
        toast.success('added a new product', {
          position: 'bottom-left',
        })
      }
          if (typeof window !== 'undefined') {
                  localStorage.setItem('cartItem', JSON.stringify(state.cartItem))

      }
    },

    removeCartItem: (state, action: PayloadAction<ProductType>) => {
      const newCartItem = state.cartItem.filter(
        (item) => item.id !== action.payload.id,
      )
      state.cartItem = newCartItem
          if (typeof window !== 'undefined') {
            localStorage.setItem('cartItem', JSON.stringify(state.cartItem))

      }
      toast.error('remove product fom cart', {
        position: 'bottom-left',
      })
    },

    decreaseCartItem: (state, action: PayloadAction<ProductType>) => {
      const itemIndex = state.cartItem.findIndex(
        (item) => item.id === action.payload.id,
      )

      if (state?.cartItem[itemIndex].cartQuantity! > 1) {
        state.cartItem[itemIndex].cartQuantity! -= 1
        toast.info('Decreased cart quantity', {
          position: 'bottom-left',
        })
      } else if (state?.cartItem[itemIndex].cartQuantity! === 1) {
        const newCartItem = state.cartItem.filter(
          (item) => item.id !== action.payload.id,
        )

        state.cartItem = newCartItem
        toast.error('remove product fom cart', {
          position: 'bottom-left',
        })
      }
          if (typeof window !== 'undefined') {
                  localStorage.setItem('cartItem', JSON.stringify(state.cartItem))

      }
    },

    clearCart: (state) => {
      state.cartItem = []
      toast.error('Cart cleared', {
        position: 'bottom-left',
      })
          if (typeof window !== 'undefined') {
                  localStorage.setItem('cartItem', JSON.stringify(state.cartItem))

      }
    },

    getTotals(state) {
      let { total, quantity } = state.cartItem.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem
          const itemTotal = (Number(price) || 0) * (cartQuantity || 0)

          cartTotal.total += itemTotal
          cartTotal.quantity += cartQuantity as number

          return cartTotal
        },
        {
          total: 0,
          quantity: 0,
        },
      )
      total = parseFloat(total.toFixed(2))
      state.cartTotalQuantity = quantity
      state.cartTotalAmount = total
    },
  },
})

export const {
  addToCart,
  removeCartItem,
  decreaseCartItem,
  clearCart,
  getTotals,
} = cartSlice.actions
export default cartSlice.reducer
