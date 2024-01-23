import React from 'react';
import ReactWhatsapp from 'react-whatsapp';
import styles from "../styles/ButtonDesign.module.css";

export default function WhatsAppWId({ phone }) {
  return (
    <div className={styles.whatsappbuttonholder}>
      <ReactWhatsapp
        number={phone}
        message={"Quiero más información acerca de"}
        // element={"button"}
      >
        <div className={styles.loginbuttonholderwhatsapp}>
          <div className={styles.buttonholder}>
            <div type="submit" className={`${styles.button}`} style={{ fontSize: "1rem", paddingTop: ".4rem" }}>
              Deseo Informacion
            </div>
          </div>
          <div className={styles.logoimageholderwhats}>
            <img src="/whatsapp2.png" alt="" />
          </div>
        </div>
      </ReactWhatsapp>
    </div>
  )
}
