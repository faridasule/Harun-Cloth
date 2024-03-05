'use-client'


import Banner from '../component/top-banner'
import AllProduct from '../component/products'


export default function HomePage() {

 if (typeof window !== 'undefined') {
    const storedUserString = localStorage.getItem('user');
    const storedUser = storedUserString ? JSON.parse(storedUserString) : null
 }
  
  return (
    <div>
      <Banner />
      <AllProduct/>
    </div>
  )
}


