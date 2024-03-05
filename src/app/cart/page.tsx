'use client'


import Cart from '@/src/component/cart'
import React from 'react'

  if (typeof window !== 'undefined') {
    const storedUserString = localStorage.getItem('user');
    const storedUser = storedUserString ? JSON.parse(storedUserString) : null
  }

const CartPage = () => {
  return (
    <div>
      <Cart/>
    </div>
  )
}

export default CartPage
