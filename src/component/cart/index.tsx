'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from './cart.module.css'
import {
  addToCart,
  removeCartItem,
  decreaseCartItem,
  clearCart,
  getTotals,
} from '@/src/@core/redux/feautures/cartSlice'
import { RootState } from '@/src/@core/redux/store'
import { ProductType } from '@/src/@core/types'
import { Heading, Pane, Text, Button, Link } from 'evergreen-ui'
import { IoArrowBack } from 'react-icons/io5'
import FlutterPay from './flutter'

const Cart = () => {
  const cart = useSelector((state: RootState) => state.product)
    const { user } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTotals())
  }, [cart, dispatch])

  const handleAddToCart = (product: ProductType) => {
    dispatch(addToCart(product))
  }
  const handleDecreaseCart = (product: ProductType) => {
    dispatch(decreaseCartItem(product))
  }
  const handleRemoveFromCart = (product: ProductType) => {
    dispatch(removeCartItem(product))
  }
  const handleClearCart = () => {
    dispatch(clearCart())
  }
  return (
    <Pane className={style['cart-container']}>
      <Heading className={style['h2']}>Shopping Cart</Heading>
      {cart.cartItem.length === 0 ? (
        <Pane className={style['cart-empty']}>
          <p className={style['p']}>Your cart is currently empty</p>
          <div className={style['start-shopping']}>
            <Link href="/" className={style['a']}>
              <IoArrowBack className={style['arrow']} />
              <Text className={style['span']}>Start Shoping</Text>
            </Link>
          </div>
        </Pane>
      ) : (
        <div>
          <div className={style['titles']}>
            <Heading className={style['product-titles']}>Product</Heading>
            <Heading className={style['price']}>Price</Heading>
            <Heading className={style['quantity']}>Quantity</Heading>
            <Heading className={style['total']}>Total</Heading>
          </div>
          <div className={style['cart-items']}>
            {cart.cartItem &&
              cart.cartItem.map((cartItem) => (
                <div className={style['cart-item']} key={cartItem.id}>
                  <div className={style['cart-product']}>
                    <img src={cartItem.image} alt={''} />
                    <div className={style['cart-detail']}>
                      <Heading>{cartItem.title}</Heading>
                      <Button
                        onClick={() => handleRemoveFromCart(cartItem)}
                        className={style['button']}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                  <div className={style['cart-product-price']}>
                    ${cartItem.price}
                  </div>
                  <div className={style['cart-product-quantity']}>
                    <Button
                      onClick={() => handleDecreaseCart(cartItem)}
                      className={style['button']}
                    >
                      -
                    </Button>
                    <div className={style['count']}>
                      {cartItem.cartQuantity}
                    </div>
                    <Button
                      className={style['button']}
                      onClick={() => handleAddToCart(cartItem)}
                    >
                      +
                    </Button>
                  </div>
                  <div className={style['cart-product-total-price']}>
                    {cartItem?.price && cartItem?.cartQuantity && (
                      <Heading className={style['cart-product-total-price']}>
                        ${Number(cartItem.price) * cartItem.cartQuantity}
                      </Heading>
                    )}
                  </div>
                </div>
              ))}
          </div>
          <Pane className={style['cart-summary']}>
            <Button
              onClick={() => handleClearCart()}
              className={style['clear-btn']}
            >
              Clear Cart
            </Button>
            <Pane className={style['cart-checkout']}>
              {user ? (
                <div>
                  <div className={style['subtotal']}>
                    <Heading>Subtotal</Heading>
                    <span className={style['amount']}>${cart.cartTotalAmount}</span>
                  </div>
                  <Text className={style['p']}>
                    Taxes and shipping calculated at checkout
                  </Text>
                  <Pane marginTop={'1rem'}>
                    <FlutterPay />
                  </Pane>
                </div>
              ) : (
                <Text>
                  Please log in before checkout.
                </Text>
              )}

              <div className={style['continue-shopping']}>
                <Link href="/" className={style['a']}>
                  <IoArrowBack className={style['arrow']} />
                  <Text className={style['span']}>Continue Shopping</Text>
                </Link>
              </div>
            </Pane>
          </Pane>

        </div>
      )}
          </Pane>
  );
};

export default Cart
