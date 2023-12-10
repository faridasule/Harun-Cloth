'use-client'

import { configureStore } from '@reduxjs/toolkit'
import productReducer from './feautures/cartSlice'
import authReducer from './feautures/authSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,

  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch




