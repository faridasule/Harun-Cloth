'use client'


import ProductDetails from '@/src/component/product-detail'
import React from 'react'

  if (typeof window !== 'undefined') {
    const storedUserString = localStorage.getItem('user');
    const storedUser = storedUserString ? JSON.parse(storedUserString) : null
  }

const ProductPage = () => {
  return (
    <div>
      <ProductDetails/>
    </div>
  )
}

export default ProductPage
