'use client'

import {
  Avatar,
  Button,
  Heading,
  Link,
  Pane,
  Position,
  SideSheet,
  Text,
} from 'evergreen-ui'
import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import style from './header.module.css'
import { LiaShoppingBagSolid } from 'react-icons/lia'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/src/@core/redux/store'
import { getTotals } from '@/src/@core/redux/feautures/cartSlice'
import { RxHamburgerMenu } from 'react-icons/rx'
import { logout } from '@/src/@core/redux/feautures/authSlice'

const Header = () => {
    const { user } = useSelector((state: RootState) => state.auth);

  const { cartTotalQuantity } = useSelector((state: RootState) => state.product)
  const dispatch = useDispatch()
  const [isSideSheetShown, setIsSideSheetShown] = useState<boolean>(false)

  useEffect(() => {
    dispatch(getTotals())
  }, [cartTotalQuantity, dispatch])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSideSheetShown(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Pane className={style['container']}>
      <Pane className={style['logo']}>
        <div className={style['single-menu']}>
          <RxHamburgerMenu
            size={24}
            onClick={() => setIsSideSheetShown(!isSideSheetShown)}
          />
        </div>
        <Text className={style['harun']}>Harun</Text>
        <Text className={style['cloth']}>Cloth</Text>
      </Pane>

      <Pane className={style['list']}>
        <ul className={style['nav-link']}>
          <li className={style['link']}>Home</li>
          <li className={style['link']}>About</li>
          <li className={style['link']}>Men</li>
          <li className={style['link']}>Women</li>
          <li className={style['link']}>Contact</li>
        </ul>
      </Pane>

      <Pane className={style['utils']}>
        <Pane className={style['search']}>
          <CiSearch size={30} color="grey" />
          <Heading className={style['hd']}>
            <LiaShoppingBagSolid size={25} />:{cartTotalQuantity}
          </Heading>
          {user && <Avatar backgroundColor='#AAAAAA;' color='#ffffff'  name= {user.fullName} size={40} marginRight={16} />}

          

        </Pane>

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
                <Button onClick={() => dispatch(logout())} className={style['btn-login']}>Log out</Button>
              </Link>
            </>
          )}
         {/* <Link href='/authentication/login'><Button className={style['btn-login']}>Login</Button></Link>  */}
        {/* <Link href='authentication/signup'>  <Button className={style['btn-signup']}>Sign up</Button></Link>  */}
        </Pane>
      </Pane>
      <SideSheet
        position={Position.LEFT}
        isShown={isSideSheetShown}
        width="60vw"
        onCloseComplete={() => setIsSideSheetShown(false)}
      >
        <Pane className={style['side-menu']}>
          <ul className={style['link-mobile']}>
            <li className={style['link']}>Home</li>
            <li className={style['link']}>About</li>
            <li className={style['link']}>Men</li>
            <li className={style['link']}>Women</li>
            <li className={style['link']}>Contact</li>
          </ul>
          <Pane className={style['sidesheet-btn-wrapper']}>
            <Pane className={style['sidesheet-btn-wrapper']}>
              <Link href={'/authentication/login'} className={`${style['login']}`}>
                <Text className={`${style['login-text']}`}>Login</Text>{' '}
              </Link>
              <Link href={'/authentication/signup'} className={`${style['signup']}`}>
                <Text className={`${style['sign-text']}`}>Sign up</Text>
              </Link>
            </Pane>
          </Pane>
        </Pane>
      </SideSheet>
    </Pane>
  )
}

export default Header

