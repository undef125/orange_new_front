import React from "react";
import { TailSpin } from "react-loader-spinner";
import styles from "./loader.module.css"

export default function Loader() {
  return (
    <div className={styles.loadercontainer}>
      <TailSpin
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
