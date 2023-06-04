import { useEffect, useState } from "react";
import Image from "next/image";

//Layout
import MainLayout from "../layouts/MainLayout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

//components
import TokensDeposit from "@/components/Card/Log/TokensDeposit/TokensDeposit";
//Icons
import {
  FaArrowLeft,
  FaCheck,
  FaMinusSquare,
  FaPlusSquare,
} from "react-icons/fa";

//hooks
import { useProfile } from "@/hooks/useProfile";

//styles
import styles from "./funding.module.scss";
import Payment from "@/components/Card/FundCard/Payment/Payment";
import { useUserContext } from "@/hooks/useUserProgram";
import { useRouter } from "next/router";

const stripeInit = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


export default function Fund() {
  const [tokensAmount, setTokensAmount] = useState(1);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { isConnected, hasUserAccount } = useUserContext();
  const { userAddress } = useProfile();

  // useEffect(() => {
  //   if (!hasUserAccount) {
  //     const timer = setTimeout(() => {
  //       router.replace("/myAccount");
  //     }, 2000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [hasUserAccount, router]);

  const handleInputChange = () => {
    const currentValue = parseInt(document.getElementById("tokensInput").value);
    setTokensAmount(!isNaN(currentValue) ? currentValue : 0);
  };

  const handleDecrease = () => {
    if (tokensAmount > 1) {
      setTokensAmount(tokensAmount - 1);
    }
  };

  const handleIncrease = () => {
    setTokensAmount(tokensAmount + 1);
  };

  return (
    <>
      <MainLayout className="home">
        <div className={styles.fundPage_wrapper}>
          <div className={styles.fundPage_main}>
            <div className={`${styles.fundPage_fundCard} ${styles.section}`}>
              <FundCard
                tokensAmount={tokensAmount}
                setTokensAmount={setTokensAmount}
                page={page}
                setPage={setPage}
                wallet={userAddress}
              />
            </div>
            <div className={styles.fundPage_logsCards}>
              <div className={styles.fundPage_logTokensDeposit}>
                <TokensDeposit />
              </div>
              <div className={styles.fundPage_logAccountTokensGraph}>
                <p>Log Account Gr</p>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );

  function FundCard(props) {
    const { setPage, page, tokensAmount, setTokensAmount, wallet } = props;

    return (
      <>
        <div className={styles.fundPage_fundCard_label}>
          <div>
            <h2>¡Compra Nana Tokens!</h2>
          </div>
          <div className={styles.content_container}>
            {page === 1 && (
              <div className={styles.prepayment}>
                <h3>Indica cantidad de tokens</h3>
                <div className={styles.inputWithIcons}>
                  <button
                    type="button"
                    onClick={handleDecrease}
                    disabled={tokensAmount === 0}
                  >
                    <FaMinusSquare />
                  </button>
                  <input
                    id="tokensInput"
                    type="number"
                    className={styles.input}
                    placeholder="Cantidad de nana tokens"
                    value={tokensAmount}
                    onChange={handleInputChange}
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                    step="1"
                  />

                  <button type="button" onClick={handleIncrease}>
                    <FaPlusSquare />
                  </button>
                </div>
                {tokensAmount !== 0 ? (
                  <div className={styles.checkout}>
                    <button onClick={() => setPage(2)}>Pagar</button>
                  </div>
                ) : null}
              </div>
            )}

            {page != 1 && (
              <div>
                <Elements stripe={stripeInit}>
                  <Payment
                    tokensAmount={tokensAmount}
                    setPage={setPage}
                    wallet={wallet}
                  />
                </Elements>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}
