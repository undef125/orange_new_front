import React from 'react'
import styles from "./Home.module.css"
// import img from 'next/image'
import Link from 'next/link';
import { useContext } from 'react';
import { IndexContext } from '../../context';

export default function HomePage() {

  const { user } = useContext(IndexContext);
  return (
    <div className={styles.homeholder}>
      <div className={styles.boxholder}>
        <div className={styles.iconholder}>
          <img src="/home_page/store.png" alt="avatar" height="100" width="100" />
        </div>
        <div className={styles.details}>
          <div className={styles.heading}>Visita tu tienda</div>
          <div className={styles.des}>
            Este es tu sitio de
            comercio electrónico
          </div>
          <div className={styles.buttonholder}>
            <Link href={`/${user?.businessName?.trim("").split("").includes(" ") ? user?.businessName?.trim("").split(" ").join("-") : user?.businessName?.trim("")}`}>
              <a target="_blank">
                <button className={styles.visitbtn}>Ver tu tienda</button>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.boxholder}>
        <div className={styles.iconholder}>
          <img src="/home_page/buyer.png" alt="avatar" height="100" width="100" />
        </div>
        <div className={styles.details}>
          <div className={styles.heading}>Lista de compradores</div>
          <div className={styles.des}>
            {`Esta es es la base de datos de tus compradores`}
          </div>
          <div className={styles.buttonholder}>
            <Link href="/admin/DisplayBuyers">
              <button>Ver compradores</button>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.boxholder}>
        <div className={styles.iconholder}>
          <img src="/home_page/company.png" alt="avatar" height="100" width="100" />
        </div>
        <div className={styles.details}>
          <div className={styles.heading}>Información de tu
            Empresa</div>
          <div className={styles.des}>
            {`Aquí puedes editar la información de tu empresa`}
          </div>
          <div className={styles.buttonholder}>
            <Link href="/admin/ManageCompanyDetails">
              <button>Editar información</button>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.boxholder}>
        <div className={styles.iconholder}>
          <img src="/home_page/addproduct.png" alt="avatar" height="100" width="100" />
        </div>
        <div className={styles.details}>
          <div className={styles.heading}>Agregar nuevo
            Producto</div>
          <div className={styles.des}>
            {`Aquí puedes incluir nuevos productos`}
          </div>
          <div className={styles.buttonholder}>
            <Link href="/admin/AddProduct">
              <button>Agregar producto</button>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.boxholder}>
        <div className={styles.iconholder}>
          <img src="/home_page/manageproduct.png" alt="avatar" height="100" width="100" />
        </div>
        <div className={styles.details}>
          <div className={styles.heading}>Editar
            Productos</div>
          <div className={styles.des}>
            {`Aquí puedes cambiar información de los productos`}
          </div>
          <div className={styles.buttonholder}>
            <Link href="/admin/EditProducts">
              <button>Editar productos</button>
            </Link>
          </div>
        </div>
      </div>
    </div >
  )
}