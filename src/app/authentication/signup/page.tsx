'use client'

import Signup from '@/src/component/authentication/signup'
import React from 'react'

  if (typeof window !== 'undefined') {
    const storedUserString = localStorage.getItem('user');
    const storedUser = storedUserString ? JSON.parse(storedUserString) : null
  }

const SignupPage = () => {
  return (
    <div>
      <Signup/>
    </div>
  )
}

export default SignupPage
