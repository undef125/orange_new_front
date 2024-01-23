import React, { useRef, useState, useEffect } from 'react';
import styles from "./payment.module.css";
import styles2 from "../../styles/ButtonDesign.module.css";
import { toast } from 'react-toastify';
import axios from "../api/axiosinterceptor";
import cookieCutter from "cookie-cutter";
import Cookies from "js-cookie"
import ReactWhatsapp from 'react-whatsapp';
import Router from 'next/router';
import decode from "jwt-decode";

export default function Payment() {

  const [checkcrypto, setcheckcrypto] = useState(false);
  const [checkother, setcheckother] = useState(false);
  const [decoded, setdecoded] = useState(0);
  const [price, setPrice] = useState(0);

  const [orange, setorange] = useState([]);


  const getCompanyDetails = async () => {
    try {
      let resp = await axios.get("/getorange");
      setorange(resp.data.data[0]);
    } catch (error) {
    }
  }


  const logOut = () => {
    Cookies.remove('accesstoken', { path: '/' });
    Router.push("/orange");
    toast.success("Desconectado", { autoClose: 1000, toastId: "loggedout" })
  };

  const toastId = useRef(null);

  const getPrice = async () => {
    try {
      let resp = await axios.get("/getprice", {
        headers: {
          Authorization: `Bearer ${cookieCutter.get("accesstoken")}`,
        }
      });
      setPrice(resp.data.data[0].price);
    } catch (error) {

    }
  }

  const sendVerReq = async () => {
    toastId.current = toast.loading("Enviando pedido...", { autoClose: false });
    try {
      await axios.get("/verifyreq", {
        headers: {
          Authorization: `Bearer ${cookieCutter.get("accesstoken")}`,
        }
      });
      toast.update(toastId.current, { render: "Solicitud enviada", type: toast.TYPE.SUCCESS, autoClose: 1000, isLoading: false })
    } catch (error) {
      error.response !== undefined
        ? toast.update(toastId.current, { render: error.response.data.msg, type: toast.TYPE.ERROR, autoClose: 1000, isLoading: false })
        : toast.update(toastId.current, { render: "Fallido", type: toast.TYPE.ERROR, autoClose: 1000, isLoading: false })
    }
  }

  useEffect(() => {
    getPrice();
    getCompanyDetails();
    let token = cookieCutter.get("accesstoken");
    setdecoded(decode(token));
  }, [])

  return (
    <div className={styles.wholepaymentholder}>
      <div className={styles.sectionone}>
        <div className={styles.imageholder}>
          <img
            src="/payment/card.png"
          />
        </div>
        <div className={styles.text}>
          <div className={styles.heading}>
            PASOS PARA CONVERTIRTE EN UN CLIENTE
            VERIFICADO:
          </div>
          <div className={styles.instructions}>
            <p>1. Selecciona la opción de pago</p>
            <p>2. Da click al botón: <b>Realizar pago</b></p>
            <p>3. Da click al botón: <b>Envíar solicitud de verificación</b></p>
            <p>4. Da click al botón: <b>Finalizar</b></p>
            <p>5. Espera la notificación por WhatsApp, para <b>iniciar sesión</b></p>

          </div>
        </div>
      </div>
      {/* yo section ma hunxa chat ani send verification request */}
      <div className={styles.sectiontwo}>
        <div className={styles.box}>
          <div className={styles.heading}>
            <span className="secondary-color" style={{ fontSize: "1.1rem", fontWeight: "600" }}>
              ESCOGE UNA DE LAS OPCIONES
              DE PAGO
            </span>
          </div>
          <div className={styles.boardandimageholder}>
            <div className={styles.amountdetail}>
              <div className={styles.tauko}>
                ${price} Dólares / 1 Año
              </div>
              <div className={styles.sarir}>
                <div className={styles.crypto}>
                  <div className={styles.checkboxholder}>
                    <input type="checkbox" name="" id="crypto" className={styles.checkbox} checked={checkcrypto} onChange={() => {
                      if (checkother) {
                        setcheckother(false)
                        setcheckcrypto(true)
                      } else setcheckcrypto(true)
                    }} />
                  </div>
                  <div className={styles.textandiconholder}>
                    <div className={styles.uppersection}>
                      <h2>${price} USDT</h2>
                      <img src="/payment/crypto.png" alt="" />
                    </div>
                    <div className={styles.lowersection}>
                      <p>Red: TRC20</p>
                    </div>
                  </div>
                </div>
                <div className={styles.other}>
                  <div className={styles.checkboxholder}>
                    <input type="checkbox" name="" id="money" className={styles.checkbox} checked={checkother} onChange={() => {
                      if (checkcrypto) {
                        setcheckcrypto(false)
                        setcheckother(true)
                      } else setcheckother(true)
                    }} />
                  </div>
                  <div className={styles.textandiconholder}>
                    <div className={styles.uppersection}>
                      <h2>${price} USD</h2>
                      <img src="/payment/otherpayment.png" />
                    </div>
                    <div className={styles.lowersection}>
                      <p>Otras opciones de pago</p>
                    </div>
                  </div>
                </div>
                <div className="chatbtnholder">
                  {orange?.whatsapp ?
                    <ReactWhatsapp number={orange?.whatsapp}
                      style={{ backgroundColor: "white", outline: "none", border: "0px" }}
                      message={`HOLA
                 quiero activar mi tienda virtual, mi correo es: ${decoded.email}\n Mi método de pago es: ${checkcrypto ? 'Criptomonedas' : checkother ? 'Otras opciones de pago' : null} `}
                    >
                      <div className={styles2.loginbuttonholder}>
                        <div className={styles2.buttonholder} >
                          <button type="submit" className={`${styles2.button}`} style={{ fontSize: "1rem" }}>
                            Realizar Pago
                          </button>
                        </div>
                        <div className={styles2.logoimageholder}>
                          <img src="/whatsapp.png" alt="" />
                        </div>
                      </div>
                    </ReactWhatsapp>
                    : <></>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.finalizingbuttons}>
          <div className={styles.sendreqbtn}>
            <button onClick={sendVerReq}>Enviar solicitud
              De verificación </button>
          </div>
          <div className={styles.finalizebtn}>
            <button onClick={logOut}>Finalizar</button>
          </div>
        </div>
      </div>

    </div>
  )
}