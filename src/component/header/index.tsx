'use client'

import {
  Avatar,
  Button,
  Heading,
  Pane,
  Text,
  Link
} from 'evergreen-ui'
import React, { useEffect} from 'react'
import style from './header.module.css'
import { LiaShoppingBagSolid } from 'react-icons/lia'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/src/@core/redux/store'
import { getTotals } from '@/src/@core/redux/feautures/cartSlice'
import { logout } from '@/src/@core/redux/feautures/authSlice'
import { useRouter } from 'next/navigation'

const Header = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  const { cartTotalQuantity } = useSelector((state: RootState) => state.product)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTotals())
  }, [cartTotalQuantity, dispatch])

    const navigate = useRouter();

  const handleDetails = () => {
    navigate.push(`/cart`)
  };


  return (
    <Pane className={style['container']}>
      <Pane className={style['logo']}>
      
        <Link style={{textDecoration:'none'}} href="/">
          <Text className={style['harun']}>Harun</Text>
          <Text className={style['cloth']}>Cloth</Text>
        </Link>
      </Pane>

      <Pane className={style['utils']}>
          <Link  onClick={handleDetails}>
          <Heading className={style['hd']}>
            
              <LiaShoppingBagSolid size={25} />:{cartTotalQuantity}
            
            </Heading>
              </Link>
          {user && (
            <Avatar
              backgroundColor="#AAAAAA;"
              color="#ffffff"
              name={user.fullName}
              size={40}
              marginRight={16}
            />
          )}

        <Pane className={style['button']}>
          {!user ? (
            <>
              <Link href="/authentication/login">
                <Button className={style['btn-login']}>Login</Button>
              </Link>
              <Link href="/authentication/signup">
                <Button className={style['btn-signup']}>Sign up</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/">
                <Button
                  onClick={() => dispatch(logout())}
                  className={style['btn-login']}
                >
                  Log out
                </Button>
              </Link>
            </>
          )}
        </Pane>
      </Pane>
      
    </Pane>
  )
}

export default Header
