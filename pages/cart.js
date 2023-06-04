import React, { useState, useEffect } from "react";
import { size, map } from "lodash";
import { useRouter } from "next/router";
import useCart from "../hooks/useCart";
import { useProgramState } from "@/hooks/useProgram";
import { usePostContext } from "@/hooks/usePostProgram";
import { useUserContext } from "@/hooks/useUserProgram";

import MainLayout from "@/layouts/MainLayout/MainLayout";
import CartProductsView from "@/components/Cart/CartProductsView/CartProductsView";

import UtilsProducts from "@/utils/web3/Products/UtilsProducts";
import SummaryCart from "@/components/Cart/SummaryCart/SummaryCart";
import styles from "./cart.module.scss";

export default function Cart() {
  const router = useRouter();
  const { getProductsCart } = useCart();
  const products = getProductsCart();
  const { markets } = useProgramState();
  const { posts } = usePostContext();
  const { isConnected, hasUserAccount } = useUserContext();

  useEffect(() => {
    if (!hasUserAccount) {
      const timer = setTimeout(() => {
        router.replace("/myAccount");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [hasUserAccount, router]);

  return !products ? (
    <EmptyCart />
  ) : (
    <FullCart products={products} posts={posts} />
  );
}

function EmptyCart() {
  return (
    <MainLayout className="empty-cart">
      <h2>No hay productos en el carrito</h2>
    </MainLayout>
  );
}

function FullCart(props) {
  const { products, posts } = props;

  const [productsData, setProductsData] = useState(null);
  const [productsTemp, setProductsTemp] = useState([]);
  const [marketData, setMarketData] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);

  useEffect(() => {
    (async () => {
      const productsTempLocal = [];
      const marketTemp = [];

      for (const product of products) {
        const splitData = product.split("#");
        if (splitData.length === 2) {
          const data = splitData[0];
          productsTempLocal.push(data);
          const data2 = splitData[1];
          marketTemp.push(data2);
        }
      }

      // Verificación que todos son los mismos
      for (let i = marketTemp.length - 1; i > 0; i--) {
        if (marketTemp[i] !== marketTemp[i - 1]) {
          marketTemp.splice(i, 1);
          productsTempLocal.splice(i, 1);
        }
      }

      setMarketData(marketTemp[0]);
      setProductsTemp(productsTempLocal);
    })();
    setReloadCart(false);
  }, [reloadCart]);

  useEffect(() => {
    if (marketData && productsTemp.length > 0) {
      setProductsData(
        UtilsProducts.getAllProductsInCartByMarketHash(
          marketData,
          productsTemp,
          posts
        )
      );

      console.log(productsData);
    }
  }, [marketData, productsTemp, posts]);

  return (
    <MainLayout className="full-cart">
      {size(productsData) > 0 && (
        <>
          <SummaryCart
            reloadCart={reloadCart}
            setReloadCart={setReloadCart}
            products={productsData}
          />
        </>
      )}

      {size(productsData) == 0 && (
        <>
          <p>No hay productos en el carrito1</p>
        </>
      )}
    </MainLayout>
  );
}

/*<CartProductsView products={productsData} market={marketData} /> */
