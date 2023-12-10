'use client'
import { Button, Pane, Heading, Text, Link } from 'evergreen-ui'
import style from './top-banner.module.css'
import image from '../../../public/landing.jpeg'
import Image from 'next/image'


import React from 'react'

const Banner = () => {
  return (
    <div className={style['container']}>
          <Pane className={style['wrapper']}>
               <Pane className={style['text-wrapper']}>
                <Heading className={style['leadind-txt']}>
          Discover our   Regal Designs and Modern Aesthetics: 
          </Heading>
          <Text className={style['text']}>
              Inspired by global trends, our designs are infused with a touch of local flair, creating a collection that is truly international yet uniquely yours.
          </Text>
          <Pane className={style['btn-wrapper']}>
            <Link href=''>
              <Button className={style['btn']}>
              Shop now 
              </Button>
              </Link>
          </Pane>
          </Pane>
          
          <Pane className={style['image']}>
              <Image src={image} alt={'image'} className={style['img']}/> 
          </Pane>
         </Pane>
    </div>
  )
}

export default Banner

