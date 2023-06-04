import { PublicKey } from "@solana/web3.js";
import {
  FaHome,
  FaUser,
  FaCaretUp,
  FaCaretDown,
  FaShoppingCart,
  FaCashRegister,
  FaStore,
  FaMoneyBill1Wave,
} from "react-icons/fa";

export const RPC_ENDPOINT =
  "https://cosmopolitan-greatest-spree.solana-devnet.discover.quiknode.pro/25d435dd5973454c5b9c044f298b0f3a1132c2a4/";

export const PROGRAM_ID = new PublicKey(
  "4gfTd9KyZ1jS2XZZGUBcvvVDec85nB2BdjNxt9tEWBP2"
);

export const routeComplete = [
  { text: "Principal", iconName: FaHome, route: "/" },
  { text: "Mercados", iconName: FaStore, route: "/markets" },
  { text: "Mi Mercado", iconName: FaCashRegister, route: "/myMarket" },
  { text: "Mi Cuenta", iconName: FaUser, route: "/myAccount" },
  { text: "Mi Carrito", iconName: FaShoppingCart, route: "/cart" },
  { text: "Fondeo", iconName: FaCaretUp, route: "/funding" },
  { text: "Retiro", iconName: FaCaretDown, route: "/withdrawn" },
];

export const balance = [
  { text: "Balance", iconName: FaMoneyBill1Wave, route: "/" },
];

export const routeNoAccount = [
  { text: "Home", iconName: FaHome, route: "/" },
  { text: "Create Account", iconName: FaUser, route: "/myAccount" },
];

export const routeNoMarket = [
  { text: "Home", iconName: FaHome, route: "/" },
  { text: "Deposit Tokens", iconName: FaCaretUp, route: "/funding" },
  { text: "Withdraw Tokens", iconName: FaCaretDown, route: "/withdrawn" },
  { text: "Markets", iconName: FaStore, route: "/markets" },
  { text: "Create Market", iconName: FaCashRegister, route: "/myMarket" },
  { text: "My Cart", iconName: FaShoppingCart, route: "/cart" },
  { text: "My Account", iconName: FaUser, route: "/myAccount" },
];

export const TRANSACTION_TYPES = ["Fondeo", "Compras", "Ventas"];
export const TRANSACTION_STATUS = {
  fondeo: ["Todos", "ingresos", "retiros"],
  compras: ["Todas", "Solicitadas", "Entregadas"],
  ventas: ["Todas", "Aceptadas", "Entregadas"],
};
export const TRANSACTION_PERIODS = [
  "todas",
  "últimos 7 días",
  "últimos 3 días",
];

export const BASE_PATH = "localhost:3000";

export const CART = "cart";

export const URL = "http://localhost:3030";
