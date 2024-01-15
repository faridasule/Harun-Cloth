import { getProduct } from '@/src/@core/service/product'
import { Button, Heading, Pane, Text } from 'evergreen-ui'
import React, { useEffect, useState } from 'react'
import style from './product-deatail.module.css'
import { ProductType } from '@/src/@core/types'
import { useParams } from 'next/navigation'
import { MdOutlineStar } from 'react-icons/md'
import {
  addToCart,
  decreaseCartItem,
} from '@/src/@core/redux/feautures/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/src/@core/redux/store'
import { useRouter } from 'next/navigation'

const ProductDetails  = () => {
  const cart = useSelector((state: RootState) => state.product)
  const dispatch = useDispatch()
  const navigate = useRouter()

  const { id } = useParams<{ id: string }>() // Get the 'id' parameter from the URL

  const [product, setProduct] = useState<ProductType | null>(null)

  const fetchProduct = async (productId: number) => {
    try {
      const result = await getProduct(productId)
      setProduct(result.data) // Assuming result contains product data including the 'image' property
    } catch (err) {
      console.error('Error fetching product:', err)
    }
  }
  const [baseQty, setBaseQty] = useState<number>(1);

  useEffect(() => {
    if (id) {
      const productId = parseInt(id);
      fetchProduct(productId);
    }
  }, [id]);

  useEffect(() => {
    // Update baseQty after product data is fetched
    if (product) {
      // Assuming product.id is the actual product ID
      const productId = product.id;

      // Check if the product ID is in the cart
      const isInCart = cart.cartItem.some(item => item.id === productId);

      if (isInCart) {
        // If found in the cart, set baseQty to the corresponding cartQuantity
        const cartItem = cart.cartItem.find(item => item.id === productId);
        setBaseQty(cartItem?.cartQuantity || 7);

      }
    }
  }, [product, cart.cartItem]);
  // useEffect(() => {
  //   // Update baseQty after product data is fetched
  //   if (product) {
  //     const productId = product.id - 1; // Adjusting for 0-based indexing

  //     setBaseQty(cart.cartItem[productId]?.cartQuantity || 7);
  //   }
  // }, [product, cart.cartItem]);
  const handleAddToCart = (product: ProductType) => {
    dispatch(addToCart(product))
  }
  const handleDecreaseCart = (product: ProductType) => {
    dispatch(decreaseCartItem(product))
  }
  


  return (
    <>
      {product && (
        <Pane className={style.wrapper}>
          <div className={style.imgdetails}>
            <img
              src={product.image}
              alt="Product"
              width="100%"
              className={style.imageDetails}
            />
          </div>
          <Pane className={style.detail}>
            <Heading className={style.title}>{product.title}</Heading>
            <Heading className={style.price}>${product.price}</Heading>

            {/* customer rating */}
            <div className={style.review}>
              <div className="flex">
                <MdOutlineStar />
                <MdOutlineStar />
                <MdOutlineStar />
                <MdOutlineStar />
                <MdOutlineStar />
              </div>
              <Text>(1 Customer review)</Text>
            </div>

            <Text className={style.description}>{product.description}</Text>

            <div className={style['cart']}>
              <div className={style['quantity-wrap']}>
                <Text className={style.quantity} size={500}>
                  Quantity
                </Text>

                <div className={style['btn-wrap']}>
                   <Button
                    className={style.btn}
                    onClick={() => setBaseQty(1 + 0)}
                  >
                    -
                  </Button>

                  <Text>{baseQty}</Text>

                  <Button
                    className={style.btn}
                    onClick={() => handleAddToCart(product)}
                  >
                    +
                  </Button>
                </div>
              </div>
              {/* add to cart */}
              <Button
                onClick={() => {
                  navigate.push(`/cart`)
                }}
                className={style['button']}
              >
                ADD TO BAG
              </Button>
            </div>
          </Pane>
        </Pane>
      )}
    </>
  )
}

export default ProductDetails

