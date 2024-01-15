import React from "react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { useSelector } from "react-redux";
import { RootState } from "@/src/@core/redux/store";
import style from './cart.module.css'


const FlutterPay = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const cart = useSelector((state: RootState) => state.product);

  const config = {
    public_key: "FLWPUBK_TEST-d8ab65dc58a2ac1d980e96719cc1a0e7-X",
    tx_ref: Date.now().toString(),
    amount: cart.cartTotalAmount,
    currency: "USD",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: user?.emailAddress ?? "", // Use an empty string as a default value
      phone_number: "",
      name: user?.fullName ?? "", // Use an empty string as a default value
    },
    customizations: {
      title: "Harun's Cloth",
      description: "Payment for items in cart",
      logo: "",
    },
  };

  const fwConfig = {
    ...config,
    text: "Checkout",
    callback: (response: any) => {
      console.log(response);
      closePaymentModal();
    },
    onClose: () => {},
  };

  return <FlutterWaveButton {...fwConfig} className={style["button"]} />;
};

export default FlutterPay;
