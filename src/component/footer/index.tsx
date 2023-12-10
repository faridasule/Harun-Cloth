'use client'

import { Button, Pane, Text, TextInput} from 'evergreen-ui'
import React from 'react'
import style from './footer.module.css'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";



const Footer = () => {
  return (
    <Pane className={style['container']}>
       
      <Pane className={style['wrap-content']}>
       
        <Pane  className={style['content']}>
             <Pane className={style['logo']}>
            <Text className={style['harun']}>Harun</Text><Text className={style['cloth']}>Cloth</Text>
            </Pane>

         <ul className={style['ul']}>
          <li className={style['li']}>About</li>
          <li className={style['li']}>Contact</li>
          <li className={style['li']}>Service</li>
          <li className={style['li']}>Service</li>
           <li className={style['li']}>Service</li>
          </ul>
          <ul className={style['ul-social']}>
          <li className={style['li-social']}>
            <FaFacebookF />
          </li>
          <li className={style['li-social']}>
            <FaTwitter />
          </li>
          <li className={style['li-social']}>
            <FaInstagram />
          </li>
        </ul>
    </Pane>
        <Pane className={style['input']}>
          <Pane>
            <TextInput
              className={style['input-wrap']}
            placeholder='Your email address…'
          />
          </Pane>
          
          <Pane>
          <Button className={style['btn']}>Subscribe</Button>

          </Pane>
        </Pane>
      </Pane>
      <hr></hr>
      <Text className={style['copy-right']}>Design with love © haruncloth 2023. All right reserved
      </Text>
    </Pane>
  )
}

export default Footer

