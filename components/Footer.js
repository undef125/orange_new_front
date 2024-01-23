import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../styles/Footer.module.css";
import iconStyles from "../styles/ProductInfoComp.module.css";
import ReactWhatsapp from "react-whatsapp";

const Footer = ({ orange }) => {
  return (
    <footer className={` ${styles.container}`}>
      <div className={styles.footerContainer}>
        <div className={styles.contactContainer}>
          <p className="address">{orange?.address}</p>
          <p className="email">
            E_mail:
            <span>
              <a href={`mailto:info@orangepublicity.com`}>{orange?.email}</a>
            </span>
          </p>
          <p className="phone">
            WhatsApp:
            <span>
              <a href={`tel:${orange?.whatsapp}`}>{orange?.whatsapp}</a>
            </span>
          </p>
        </div>
        <div className={styles.termsContainer}>
          <Image src="/logo.png" alt="logo" height={100} width={100} />
          <p>
            <Link href="/docs/privacypolicy.html">
              <span style={{ cursor: "pointer" }}>Política de privacidad</span>
            </Link>
            <br />
            <Link href="/docs/terms.html">
              <span style={{ cursor: "pointer" }}>Términos y condiciones</span>
            </Link>
            <br />
            All rights reserved
          </p>
        </div>
        <div className={styles.linkContainer}>
          {orange?.whatsapp ? (
            <ReactWhatsapp
              number={orange?.whatsapp}
              message={"Quiero más información acerca de"}
              style={{
                backgroundColor: "inherit",
                border: "0px",
                cursor: "pointer",
              }}
            >
              <div className={styles.socialiconholder}>
                <img
                  src="/Social_Media_Icons/WhatsApp_icon.png"
                  alt="whatsapp"
                  className={iconStyles.icon}
                  style={{ color: "#25D366" }}
                />
              </div>
            </ReactWhatsapp>
          ) : (
            <></>
          )}
          {orange?.email ? (
            <a href={`mailto:${orange?.email}`}>
              <div className={styles.socialiconholder}>
                <img
                  src="/Social_Media_Icons/Email_Icon.png"
                  alt="email"
                  className={iconStyles.icon}
                  style={{ color: "#25D366" }}
                ></img>
              </div>
            </a>
          ) : (
            <></>
          )}
          {orange?.youtube ? (
            <a href={`${orange?.youtube}`}>
              <div className={styles.socialiconholder}>
                <img
                  src="/Social_Media_Icons/youtube_icon.png"
                  alt="youtube"
                  className={iconStyles.icon}
                  style={{ color: "#25D366" }}
                ></img>
              </div>
            </a>
          ) : (
            <></>
          )}
        </div>
      </div>
      <p className={styles.copyrightText} style={{ zIndex: "0" }}>
            Copyright &copy; - Orange Publicity
          </p>
    </footer>
  );
};

export default Footer;
