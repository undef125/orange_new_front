import Image from "next/image";
import React, { useState, useEffect, useRef, useContext } from "react";
import styles from "../../styles/Login.module.css";
import styles2 from "../../styles/ButtonDesign.module.css";
import axios from "../api/axiosinterceptor";
import { toast } from "react-toastify";
import Router from "next/router";
import { Oval } from "react-loader-spinner";
import BackBtnPop from "../../components/BackBtnPop";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("/resetpassword", { email });
      toast.success("Código enviado con éxito", {
        autoClose: 1000,
        toastId: "otpsuccess",
      });
      Router.push("/login/VerifyForgotPassword");
      setIsLoading(false);
    } catch (error) {
      error.response !== undefined
        ? toast.error(error.response.data.msg, {
          autoClose: 1000,
          toastId: "emailusererror",
        })
        : toast.error("error al enviar otp!");
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  };
  return (
    <>
      <BackBtnPop />
      {isLoading ? (
        <div className={styles.loadercontainer}>
          <Oval
            height="80"
            width="80"
            radius="9"
            color="#e06331"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
          />
        </div>
      ) : null}

      <section className={styles.loginholder}>
        <div className={styles.logincontentholder}>
          <h1 className={styles.heading}>Restablecer contraseña</h1>
          <div className={styles.container}>
            <div className={styles.imgContainer}>
              <Image
                src="/logo.png"
                alt="logo"
                width={200}
                height={200}
                className={styles.logoimage}
              />
            </div>
            <div className={styles.formContainer}>
              {/* <h2 className={styles.headingSmall}>
                enviar OTP al correo electrónico
              </h2> */}
              <form onSubmit={handleForgotPassword} className={styles.form}>
                <div className={styles.inputContainer}>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    style={{ fontWeight: 700 }}
                    placeholder="Escribe aquí tu E-mail registrado"
                    className={styles.inputs}
                  />
                </div>

                <div className={styles2.loginbuttonholdermedium}>
                  <div className={styles.buttonholder}>
                    <button type="submit" className={`${styles.button}`}>
                      Solicitar código
                    </button>
                  </div>
                  <div className={styles.logoimageholder}>
                    <img src="/login/registericon.png" alt="" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
