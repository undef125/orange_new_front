import Image from "next/image";
import React, { useState, useEffect, useRef, useContext } from "react";
import styles from "../../styles/Login.module.css";
import { FaRegCommentAlt, FaLock, FaEye } from "react-icons/fa";
import axios from "../../api/axiosinterceptor";
import { toast } from "react-toastify";
import Router from "next/router";
import { Oval } from "react-loader-spinner";
import BackBtnPop from "../../../components/BackBtnPop";

const VerifyForgotPassword = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [otp, setOtp] = useState("");
  const [newpass, setNewpass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("/verifyotp", { otp, password: newpass });
      toast.success("Contraseña actualizada con éxito", {
        autoClose: 1000,
        toastId: "passchangesuccess",
      });
      Router.push("/login");
      setIsLoading(false);
    } catch (error) {
      error.response !== undefined
        ? toast.error(error.response.data.msg, {
            autoClose: 1000,
            toastId: "emailusererror",
          })
        : toast.error("¡Error al conectarse al servidor!");
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
          <h1 className={styles.heading}>
          Ingresa el código que enviamos 
                     a tu E-mail
          </h1>
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
              <h2 className={styles.headingSmall}>Actualiza contraseña</h2>
              <form onSubmit={handlePasswordUpdate} className={styles.form}>
                <div className={styles.inputContainer}>
                  <FaRegCommentAlt className={styles.icon} />
                  <input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    type="text"
                    name="otp"
                    id="otp"
                    style={{ fontWeight: 700 }}
                    placeholder="Escribe aquí el código"
                    className={styles.inputs}
                  />
                </div>
                <div className={`${styles.inputContainer} ${styles.passwordholder}`}>
                  <FaLock className={styles.icon} />
                  <input
                    value={newpass}
                    onChange={(e) => setNewpass(e.target.value)}
                    type={`${passwordShow ? "text" : "password"}`}
                    name="password"
                    id="password"
                    style={{ fontFamily: "FontAwesome", fontWeight: 700 }}
                    placeholder="Escribe aquí tu nueva contraseña"
                    className={styles.inputs}
                  />
                  <FaEye
                    className={styles.passwordShowIcon}
                    onClick={() => setPasswordShow(!passwordShow)}
                  />
                </div>

                <div className={styles.loginbuttonholder}>
                  <div className={styles.buttonholder}>
                    <button
                      type="submit"
                      style={{ fontSize: "1rem" }}
                      className={`${styles.button}`}
                    >
                      Actualizar
                    </button>
                  </div>
                  <div className={styles.logoimageholder}>
                    <img src="/login/loginicon.png" alt="" />
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

export default VerifyForgotPassword;
