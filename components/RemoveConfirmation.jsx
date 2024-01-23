import React from 'react';
import styles from "./navbar.module.css"
import { toast } from "react-toastify"
import { useRef } from 'react';
import axios from "../pages/api/axiosinterceptor"
import cookieCutter from "cookie-cutter"

export default function RemoveConfirmation({identifier, setconfirmationPop, setrerender, rerender, api}) {
const toastId = useRef(null)
    const removeProduct = async () => {
      toastId.current = toast.loading("Enviando pedido...", { autoClose: false})
        try {
          await axios.delete(`${api}/${identifier}`, {
            headers: {
              Authorization: `Bearer ${cookieCutter.get("accesstoken")}`,
            },
          });
          toast.update(toastId.current, { render: "Producto eliminado", type: toast.TYPE.SUCCESS, autoClose: 1000, isLoading: false})
          setrerender(!rerender);
          setconfirmationPop(false);
        } catch (error) {
          toast.update(toastId.current, { render: "Error al eliminar el producto", type: toast.TYPE.ERROR, autoClose: 1000, isLoading: false})
        }
      };

  return (
    <div className={styles.popcontainerconfirmation}>
      <div className={styles.popconfirmation}>
        <div className={styles.detcontainerconfirmation}>
          <div>
            {api === "removeallproducts" ? <h4>¿Seguro que quieres eliminar todos los productos?</h4> : <h4>¿Seguro que quieres eliminar éste producto?</h4>}
            
          </div>
          <div className={styles.confirmationbtnholder}>
            <button
              onClick={() => setconfirmationPop(false)}
              className={styles.cancelbtn}
            >
              Cancelar
            </button>
            <button
              onClick={removeProduct}
              className={styles.removebtn}
            >
               Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
