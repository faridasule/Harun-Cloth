// 'use client'

import React from "react";
import { Button, Heading, Pane } from "evergreen-ui";
import style from "./../products/product.module.css";
import { ProductType } from "@/src/@core/types";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/@core/redux/store";
import { addToCart } from "@/src/@core/redux/feautures/cartSlice";

export const ProductCard = (props: ProductType) => {
  const { id, title, image, description, category, price } = props;

  const dispatch = useDispatch<AppDispatch>();

  const dispatchActions = (item: ProductType) => {
    dispatch(
      addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        category: item.category,
        description: item.description,
          image: item.image,
        cartQuantity: item.cartQuantity
      })
    );
  };

  const navigate = useRouter();

  const handleDetails = () => {
    navigate.push(`/products/${id}`)
  };

  return (
    <Pane className={style.card} onClick={handleDetails}>
      <div className={style.img}>
        <img
          src={image}
          alt="picture"
          width="100%"
          className={style.image}
        />
      </div>
      <Pane className={style.info}>
        <Heading
          data-testid={"course-title"}
          className={style.title}
        >
          {category}
        </Heading>
        <Heading>${price}</Heading>
      </Pane>
      <Pane className={style.button}>
        <Button className={style.btn} onClick={() => dispatchActions(props)}>
          Add to cart
        </Button>
      </Pane>
    </Pane>
  );
};

