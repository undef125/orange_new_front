import Link from "next/link";
import React, { useState } from "react";
import styles from "../styles/ProductInfoComp.module.css";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import SearchPop from "./SearchPop";

const ProductInfoComponent = ({ productData, products, company }) => {
  const [searchPop, setsearchPop] = useState(false);
  return (
    <div className={styles.container}>
      {searchPop ? (
        <SearchPop company={company} setsearchPop={setsearchPop} products={products} />
      ) : null}
      <div className={styles.coverImageContainer}>
        <img
          className={styles.coverImage}
          src={
            company?.coverImage?.data
              ? `data:${company?.coverImage?.fileType};base64,${company?.coverImage?.data}`
              : "/product-cover.jpg"
          }
          alt="cover"
        />
        <AiOutlineSearch
          className={styles.searchIcon}
          size={40}
          onClick={() => {
            setsearchPop(true);
          }}
        />
        <Link
          href={{
            pathname: "/cart",
            query: {
              companyName: company.companyName,
              num: company.phone,
              // whatsapp: `${productData.whatsapp}`,
            },
          }}
        >
          <AiOutlineShoppingCart
            className={styles.cartIcon}
            size={40}
            style={{ marginTop: "2.7rem" }}
            onClick={() => {
              // setsearchPop(true);
            }}
          />
        </Link>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.logoimagecontainer}>
          <img
            className={styles.logoImage}
            src={
              company?.logoImage?.data
                ? `data:${company?.logoImage?.fileType};base64,${company?.logoImage?.data}`
                : "/logo.png"
            }
            alt="cover"
          />
        </div>
        <div className={styles.textContainer}>
          <h1>{company.companyName}</h1>
          <p className="secondary-color">
            {company?.shortReview ? (
              <>{company?.shortReview}</>
            ) : (
              <>iCreate your online catalog and connect it to WhatsApp!</>
            )}
          </p>
          <LinkContainerComponent company={company} />
        </div>
      </div>
      <div className={styles.description}>
        <h2>
          {company?.description ? (
            <>{company?.description}</>
          ) : (
            <>
              Every person and company around the world should have installed an
              Orange Publicity license, where you can organize products and
              services in a professional way.
            </>
          )}
        </h2>
      </div>
    </div>
  );
};

export const LinkContainerComponent = ({ company }) => {
  const links = [
    {
      name: "Youtube",
      icon: "bx bxl-youtube",
      color: "#ff281c",
      link: `${
        company?.socialMedias?.youtube ? company.socialMedias.youtube : ""
      }`,
      image: "/Social_Media_Icons/youtube_icon.png",
    },
    {
      name: "Facebook",
      icon: "bx bxl-facebook",
      color: "#3b5998",
      link: `${
        company?.socialMedias?.facebook ? company.socialMedias.facebook : ""
      }`,
      image: "/Social_Media_Icons/facebook_icon.png",
    },
    {
      name: "Instagram",
      icon: "bx bxl-instagram",
      color: "#fbad50",
      link: `${
        company?.socialMedias?.instagram ? company.socialMedias.instagram : ""
      }`,
      image: "/Social_Media_Icons/instagram_icon.png",
    },
    {
      name: "Tiktok",
      icon: "bx bxl-tiktok",
      color: "#ff0050",
      link: `${
        company?.socialMedias?.tiktok ? company.socialMedias.tiktok : ""
      }`,
      image: "/Social_Media_Icons/tiktok_icon.png",
    },
    {
      name: "Twitter",
      icon: "bx bxl-twitter",
      color: "#1da1f2",
      link: `${
        company?.socialMedias?.twitter ? company.socialMedias.twitter : ""
      }`,
      image: "/Social_Media_Icons/Twitter_Icon.png",
    },
    {
      name: "web",
      icon: "bx bxl-internet-explorer",
      color: "#00679B",
      link: `${
        company?.socialMedias?.website ? company.socialMedias.website : ""
      }`,
      image: "/Social_Media_Icons/WEB_page_icon.png",
    },
    {
      name: "location",
      icon: "bx bxl-internet-explorer",
      color: "#00679B",
      link: `${company?.location ? company.location : ""}`,
      image: "/Social_Media_Icons/map.png",
    },
  ];
  return (
    <div className={styles.linkContainer}>
      {links.map((item, index) =>
        item.link !== "" ? (
          <div
            onClick={() => {
              window.open(item.link, "_blank");
            }}
            key={index}
          >

            <img
              src={item.image}
              alt={item.name}
              className={
                item.name === "location" ? styles.locationicon : styles.icon
              }
            />
          </div>
        ) : (
          <></>
        )
      )}
    </div>
  );
};

export default ProductInfoComponent;
