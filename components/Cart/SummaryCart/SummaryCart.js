import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

import { Table } from "semantic-ui-react";
import { forEach, map } from "lodash";
import useCart from "@/hooks/useCart";
import styles from "./SummaryCart.module.scss";
import UtilsUser from "@/utils/web3/User/UtilsUser";
import UtilsMaps from "@/utils/web3/Maps/UtilsMaps";
import { useProgramState } from "@/hooks/useProgram";
import { useProfile } from "@/hooks/useProfile";
import Toast from "@/components/Toast/Toast";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { decode } from "bs58";
import {
  confirmTransactionFromFrontend,
  signTransactionFromFrontend,
} from "../../../pages/api/shyftApi";
import { transferTokens } from "@/pages/api/cartApi";

export default function SummaryCart(props) {
  const { products, reloadCart, setReloadCart } = props;

  const [totalPrice, setTotalPrice] = useState(0);
  const { removeProductCart, addProductCart } = useCart();
  const [selectedAddress, setSelectedAddress] = useState(undefined);
  const [userAddresses, setUserAddresses] = useState([]);
  const { isConnected, userAddress } = useProfile();
  const { shippings, createTransaction } = useProgramState();
  const [addressSelected, setAddressSelected] = useState();
  const [items, setItems] = useState("");
  const { transactions, marketTransactions, balances } = useProgramState();
  const [showToast, setShowToast] = useState(false);
  const [text, setText] = useState("");

  const { connection } = useConnection();

  const { publicKey, wallet, signTransaction } = useWallet();

  useEffect(() => {
    let price = 0;
    forEach(products, (product) => {
      if (product.post.account.priceOffer > 0)
        price += product.post.account.priceOffer * product.cantidad;
      else price += product.post.account.price * product.cantidad;
    });
    setTotalPrice(price);

    const items = products
      .filter((product) => parseInt(product.cantidad) >= 1)
      .reduce((acc, product) => {
        const item = `${product.post.publicKey}#${product.cantidad},`;
        return acc + item;
      }, "");
    setItems(items);
  }, [reloadCart, products]);

  useEffect(() => {
    if (shippings) {
      const addresses = UtilsUser.getUserAddressesByWallet(
        shippings,
        userAddress
      );
      setUserAddresses(addresses);
    }
  }, [shippings, userAddress]);

  const removeProduct = (product) => {
    removeProductCart(product);
    setReloadCart(true);
  };

  const addProduct = (product) => {
    addProductCart(product);
    setReloadCart(true);
  };

  const handleAddressChange = (e) => {
    if (!e.target.value) setSelectedAddress(undefined);

    const selectedId = e.target.value;
    const selected = userAddresses.find(
      (address) => address.id.toString() === selectedId
    );
    setSelectedAddress(selected);
    //alert(JSON.stringify(selected));
  };

  return (
    <>
      <div className={styles.title}>Resumen del carrito</div>

      <div className={styles.summary_cart}>
        <div className={styles.summary_cart_data}>
          <Table celled structured className={styles.summary_cart_table}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Producto</Table.HeaderCell>
                <Table.HeaderCell>Descripción</Table.HeaderCell>
                <Table.HeaderCell>Cantidad</Table.HeaderCell>
                <Table.HeaderCell>Precio</Table.HeaderCell>
                <Table.HeaderCell>Acciones</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {map(
                products,
                (product) =>
                  product.cantidad > 0 && (
                    <Table.Row
                      key={product.post.publicKey.toString()}
                      className={styles.summary_cart_product}
                    >
                      <Table.Cell>{product.post.account.title}</Table.Cell>
                      <Table.Cell>
                        {product.post.account.description}
                      </Table.Cell>
                      <Table.Cell>{product.cantidad}</Table.Cell>
                      <Table.Cell>
                        {product.post.account.priceOffer > 0
                          ? product.post.account.priceOffer
                          : product.post.account.price}
                      </Table.Cell>
                      <Table.Cell className={styles.summary_cart_actions}>
                        <FaPlus
                          onClick={() => {
                            console.log(
                              `${product.post.publicKey.toString()}#${product.post.account.owner.toString()}`
                            );

                            addProduct(
                              `${product.post.publicKey.toString()}#${product.post.account.owner.toString()}`
                            );
                          }}
                        />
                        <FaMinus
                          onClick={() => {
                            console.log(
                              `${product.post.publicKey.toString()}#${product.post.account.owner.toString()}`
                            );

                            removeProduct(
                              `${product.post.publicKey.toString()}#${product.post.account.owner.toString()}`
                            );
                          }}
                        />
                      </Table.Cell>
                    </Table.Row>
                  )
              )}
              <Table.Row className={styles.summary_cart_resume}>
                <Table.Cell className={styles.clear}></Table.Cell>
                <Table.Cell colSpan="2">Total:</Table.Cell>
                <Table.Cell className={styles.total_price}>
                  ${totalPrice.toFixed(2)}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
      <div className={styles.title}>Dirección de envio</div>
      <div className={styles.summary_cart_selector_wrapper}>
        <select type="text" onChange={handleAddressChange}>
          <option value={null}>Elige una dirección</option>
          {map(userAddresses, (address) => (
            <option key={address.id.toString()} value={address.id.toString()}>
              {address.label}
            </option>
          ))}
        </select>
      </div>
      {selectedAddress && (
        <>
          <ShippigCart
            selectedAddress={selectedAddress}
            createTransaction={createTransaction}
            total={totalPrice.toFixed(2).toString()}
            userAddress={userAddress}
            items={items}
            owner={products[0].post.account.owner.toString()}
            transactions={transactions}
            marketTransactions={marketTransactions}
            balances={balances}
            setShowToast={setShowToast}
            showToast={showToast}
            setText={setText}
            wallet={wallet}
            signTransaction={signTransaction}
            connection={connection}
          />
        </>
      )}

      <Toast showToast={showToast} setShowToast={setShowToast} text={text} />
    </>
  );
}

function ShippigCart(props) {
  const {
    selectedAddress,
    createTransaction,
    total,
    userAddress,
    items,
    owner,
    transactions,
    marketTransactions,
    balances,
    setText,
    showToast,
    setShowToast,
    wallet,
    signTransaction,
    connection,
  } = props;
  const timestamp_delivered = "";
  const delivered = "";
  const verify = "1";
  console.log("userAddress", total);
  const onPay = async (e) => {
    const { accountRealBalance } = UtilsUser.getAccountTxsByWallet(
      transactions,
      marketTransactions,
      balances,
      userAddress
    );

    if (parseFloat(accountRealBalance) - parseFloat(total) < 0) {
      setText("No tienes el balance suficiente");
      setShowToast(true);
      return null;
    }

    const tx = await transferTokens({
      to_wallet: owner,
      tokensAmount: total,
      from_wallet: userAddress,
    });

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

      console.log(completedTransaction);

      createTransaction(
        userAddress, //tx,
        owner, //rx,
        total, //amount,
        selectedAddress.shippingID.toString(), //shipping_pubk
        Date.now().toString(), //timestamp_verify,
        verify, //verify
        timestamp_delivered, //timestamp_delivered
        delivered, //delivered
        items //items
      );
    }
  };

  return (
    <div>
      <div className={styles.shippigCart_wrapper}>
        <div>Email: {selectedAddress.email}</div>
        <div>Phone: {selectedAddress.numberPhone}</div>
      </div>
      <div className={styles.shippigCart_wrapper}>
        <div>{selectedAddress.state}</div>
        <div>{selectedAddress.municipio}</div>
        <div>Col. {selectedAddress.colonia}</div>
        <div>{selectedAddress.street}</div>
        <div>Exterior #{selectedAddress.numExt}</div>
        <div>Interior #{selectedAddress.numInt}</div>
      </div>
      <div className={styles.shippigCart_pay_wrapper} onClick={onPay}>
        <div className={styles.shippigCart_pay}>
          <a>PAGAR</a>
        </div>
      </div>
    </div>
  );
}
