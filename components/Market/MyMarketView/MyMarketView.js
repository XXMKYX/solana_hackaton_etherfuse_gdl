import { useRouter } from "next/router";
import ItemButtons from "../ItemButtons";
import MarketFoot from "../MarketFoot";
import ItemHeader from "../ItemHeader";

import styles from "./MyMarketView.module.scss";

export default function FeedMarket(props) {
  const { avatar, data, key } = props;
  console.log("dataaa owner", data.owner.toString());
  const user = data.owner.toString();
  const router = useRouter();

  return (
    <div className={styles.myMarket_wrapper}>
      <div className={styles.myMarket_mainInfo}>
        <div>
          <p>Market: {data.marketName}</p>
        </div>
        <div>
          <p>Giro: {data.marketFocusesOn}</p>
        </div>
        <div>
          <p className={styles.item_foot_product_available}>
            {" "}
            {data.marketAvailable == 1 ? "DISPONIBLE" : ""}
          </p>
          <p className={styles.item_foot_product_not_available}>
            {" "}
            {data.marketAvailable != 1 ? "NO DISPONIBLE" : ""}
          </p>
        </div>
      </div>

      <div className={styles.myMarket_Addres}>
        <div>
          <p>Calle: {data.street}</p>
        </div>
        <div>
          <p>Colonia: {data.colonia}</p>
        </div>
        <div>
          <p>Municipio: {data.municipio}</p>
        </div>
        <div>
          <p>Estado: {data.state}</p>
        </div>
      </div>

      <div className={styles.myMarket_Addres_Number}>
        <div>
          <p>CP: {data.zip}</p>
        </div>
        <div>
          <p>Numero Exterior: {data.numExt}</p>
        </div>
        <div>
          <p>Numero Interior: {data.numInt}</p>
        </div>
      </div>

      <div className={styles.myMarket_Addres_Contact}>
        <div>
          <p>Email: {data.email}</p>
        </div>
        <div>
          <p>Numero telefonico: {data.numberPhone}</p>
        </div>
      </div>
    </div>
  );
}
