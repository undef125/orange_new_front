import React from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import Router from "next/router";
import { deleteCookie } from 'cookies-next';
import { toast } from "react-toastify";

export default function Navbar() {
  const logOut = () => {
    deleteCookie('accesstoken', { path: '/' });
    Router.push("/orange");
    toast.success("desconectado", {autoClose: 1000, toastId: "loggedout"})
  };

  return (
    <div className={styles.navbarholder}>
      <div className={styles.internalNav}>
        <div className={styles.left}>
          <Image src="/logo.png" alt="" height="30" width="30" />
          <h2>Dashboard</h2>
        </div>
        <div className={styles.right}>
          <button onClick={logOut}>Cerrar Sesión</button>
        </div>
      </div>
    </div>
  );
}
