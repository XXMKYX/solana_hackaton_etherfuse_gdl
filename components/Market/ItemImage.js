import React from "react";
import Image from "next/image";
import styles from "./ItemImage.module.scss";

export default function ItemImage(props) {
  const { image } = props;
 console.log(image)
  return (
    <div className={styles.item_image_wrapper}>
      <div className={styles.item_image_container}>
        <Image className={styles.item_image_img} src={image} layout="fill" />
      </div>
    </div>
  );
}
