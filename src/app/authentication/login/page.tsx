'use client'

import Login from '@/src/component/authentication/login'
import React from 'react'

  if (typeof window !== 'undefined') {
    const storedUserString = localStorage.getItem('user');
    const storedUser = storedUserString ? JSON.parse(storedUserString) : null
}
  
const SignupPage = () => {
  return (
    <div>
      <Login/>
    </div>
  )
}

export default SignupPage
