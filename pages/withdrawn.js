import { useEffect, useState } from "react";
import Image from "next/image";

//Layout
import MainLayout from "../layouts/MainLayout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Toast from "@/components/Toast/Toast";
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
import { useProgramState } from "@/hooks/useProgram";
import { burnTokens } from "./api/cartApi";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import UtilsUser from "@/utils/web3/User/UtilsUser";
import { confirmTransactionFromFrontend } from "./api/shyftApi";

export default function Withdrawn() {
  const { transactions, marketTransactions, balances } = useProgramState();
  const [tokensAmount, setTokensAmount] = useState(1);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { isConnected, hasUserAccount } = useUserContext();
  const { userAddress } = useProfile();
  const [showToast, setShowToast] = useState(false);
  const [text, setText] = useState("");

  const { connection } = useConnection();

  const { publicKey, wallet, signTransaction } = useWallet();
  const { createBalance } = useProgramState();

  useEffect(() => {
    if (!hasUserAccount) {
      const timer = setTimeout(() => {
        router.replace("/myAccount");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [hasUserAccount, router]);

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

  const onBurn = async () => {
    const { accountRealBalance } = UtilsUser.getAccountTxsByWallet(
      transactions,
      marketTransactions,
      balances,
      userAddress
    );

    if (parseFloat(accountRealBalance) - parseFloat(tokensAmount) < 0) {
      setText("No tienes el balance suficiente");
      setShowToast(true);
      return null;
    }

    console.log(userAddress, tokensAmount);

    const tx = await burnTokens({
      wallet: userAddress,
      tokensAmount: tokensAmount,
    });

    if (!tx) return null;

    if (tx.status == 200) {
      const transaction = tx.result.encodedTransaction;

      const shyftWallet = {
        wallet,
        signTransaction,
      };
      const completedTransaction = await confirmTransactionFromFrontend(
        connection,
        transaction,
        shyftWallet
      );

      createBalance("0", `${tokensAmount}`, new Date().toString());

      console.log(completedTransaction);
    }
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
                transactions={transactions}
                marketTransactions={marketTransactions}
                balances={balances}
                setShowToast={setShowToast}
                showToast={showToast}
                setText={setText}
                signTransaction={signTransaction}
                connection={connection}
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
          <Toast
            showToast={showToast}
            setShowToast={setShowToast}
            text={text}
          />
        </div>
      </MainLayout>
    </>
  );

  function FundCard(props) {
    const { page, tokensAmount, wallet } = props;

    return (
      <>
        <div className={styles.fundPage_fundCard_label}>
          <div>
            <h2>Vende Nana Tokens</h2>
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
                {tokensAmount !== 0 && (
                  <>
                    <div className={styles.checkout}>
                      <button onClick={onBurn}>
                        Pedir retiro (token burn)
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}
