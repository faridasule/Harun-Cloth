'use client'

import { Heading, Pane, Tab, Tablist, Text } from 'evergreen-ui'
import React, { useEffect, useState } from 'react'
import style from './product.module.css'
import {
  getAllCategories,
  getAllProducts,
  getProductByCategory,
} from '@/src/@core/service/product'
import { ProductType } from '@/src/@core/types'
import { ProductCard } from '../product-card'

const AllProduct = () => {
  const [patientSets, setPatientSets] = useState([])
  const [loading, setLoading] = useState(true)
  const [tabs, setTabs] = useState<string[]>(['All'])
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const fetchPatientSets = async () => {
    try {
      const result = await getAllProducts()
      setPatientSets(result.data)
    } catch (err) {}
  }

  const fetchCategories = async () => {
    try {
      const result = await getAllCategories()
      setTabs(['All', ...result.data])
    } catch (err) {
    } finally {
      setLoading(false)
    }
  }

  const fetchProductByCategory = async (category: string) => {
    try {
      setLoading(true) // Set loading to true before fetching data

      const result = await getProductByCategory(category)
      setPatientSets(result.data)
    } catch (err) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPatientSets()
    fetchCategories()
  }, [])

  return (
    <div>
      <Pane className={style.product}>
        <Pane className={style.text}>
          <Heading
            className={style.headingTxt}
            size={700}
            color="#001324"
            fontSize="20px"
            marginBottom="1rem"
          >
            Our Clothing Collections
          </Heading>
          <Text className={style.txt} color="#555555">
            Shop now
          </Text>
        </Pane>

        <Pane>
          <Tablist
            marginBottom={16}
            flexBasis={240}
            marginTop={20}
            borderBottom="2px solid #D9D9D9"
            display="flex"
            flexWrap="nowrap"
            overflow-x="scroll"
            color="#fcbd01"
          >
            {tabs.map((tab, index) => (
              <Tab
                flex-shrink="0"
                appearance="primary"
                paddingBottom={18}
                aria-controls={`panel-${tab}`}
                isSelected={index === selectedIndex}
                onSelect={() => {
                  setSelectedIndex(index)
                  if (tab !== 'All') {
                    fetchProductByCategory(tab)
                  } else {
                    fetchPatientSets() // Call this function when 'All' tab is selected
                  }
                }}
                key={tab}
               
                color="#AAAAAA"
                size={400}
                style={{ cursor: 'pointer' }}
                white-space="nowrap"
                className={style['tab']}
              >
                {tab}
              </Tab>
            ))}
          </Tablist>
          <Pane className={style['list-wrapper']} data-testid={'courses-tab'}>
            {tabs.map((tab, index) => (
              <Pane
                className={style['list-container']}
                aria-labelledby={tab}
                aria-hidden={index !== selectedIndex}
                display={index === selectedIndex ? 'block' : 'none'}
                key={tab}
                role="tabpanel"
              >
                <ul key={`${tab}_${index}`} className={style['ul']}>
                  {tab === 'All'
                    ? patientSets.map((patientSet: ProductType) => (
                        <li className={style['li']} key={patientSet.id}>
                          <ProductCard {...patientSet} />
                        </li>
                      ))
                    : patientSets
                        .filter(
                          (patientSet: ProductType) =>
                            patientSet.category == tab,
                        )
                        .map((patientSet: ProductType) => (
                          <li className={style['li']} key={patientSet.id}>
                            <ProductCard {...patientSet} />
                          </li>
                        ))}
                </ul>
              </Pane>
            ))}
          </Pane>
        </Pane>
      </Pane>
    </div>
  )
}

export default AllProduct
