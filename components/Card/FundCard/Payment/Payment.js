import React, { useState } from "react";
import styles from "./Payment.module.scss";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import {
  FaArrowLeft,
  FaCheck,
  FaMinusSquare,
  FaPlusSquare,
} from "react-icons/fa";
import { payUserTokens } from "@/pages/api/cartApi";
import Toast from "@/components/Toast/Toast";
import { useProgramState } from "@/hooks/useProgram";

export default function Payment(props) {
  const { tokensAmount, setPage, wallet } = props;
  const stripe = useStripe();
  const elements = useElements();
  const [showToast, setShowToast] = useState(false);
  const [text, setText] = useState("");
  const { createBalance } = useProgramState();

  const cardStyle = {
    style: {
      base: {
        color: "#fff",
        fontSize: "16px",
        "::placeholder": {
          color: "#909090",
        },
      },
    },
  };

  const payTokens = async () => {
    setText("No se logró realizar la operación.");
    const cardElement = elements.getElement(CardElement);
    const result = await stripe.createToken(cardElement);
    if (result.error) {
      console.log(result.error.message);
    } else {
      const tx = await payUserTokens({
        token: result.token,
        tokensAmount: tokensAmount,
        wallet: wallet,
      });

      if (tx.status == 200) {
        setText("Tokens solicitados con éxito. Autoriza la transacción");
        const now = new Date();

        createBalance("1", `${tokensAmount}`, now.toString());
      }
    }

    setShowToast(true);
  };

  return (
    <>
      <div className={styles.payment}>
        {tokensAmount > 1 && <h3>{tokensAmount} Nana tokens</h3>}
        {tokensAmount === 1 && <h3>{tokensAmount} Nana token</h3>}
        <div></div>
        <div className={styles.block}>
          <CardElement options={cardStyle} />
        </div>
      </div>

      <div className={styles.checkout}>
        <button onClick={() => setPage(1)}>
          <FaArrowLeft /> Atrás
        </button>
        <button onClick={() => payTokens()}>
          <FaCheck /> Confirmar compra
        </button>
      </div>
      <Toast showToast={showToast} setShowToast={setShowToast} text={text} />
    </>
  );
}
