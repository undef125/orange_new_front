import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./singleProduct.module.css";
import DisplayImage from "../../components/DisplayImage";
import Link from "next/link";
import { toast } from "react-toastify";
import formatCurrency from "../../utilis/formatCurrency";
import BackBtnPop from "../../components/BackBtnPop";
import axios from "../api/axiosinterceptor";
import { Oval } from "react-loader-spinner";
import SizesPop from "../../components/SizesPop";
import WhatsAppWId from "../../components/WhatsAppWId";

const SingleProduct = () => {
  const router = useRouter();
  const [productData, setProductData] = useState({});
  const [sizespop, setsizespop] = useState(false);
  const [phone, setphone] = useState("");

  const getProduct = async (id) => {
    try {
      let response = await axios.get(`/getsingleproduct/${id}`);
      setProductData({ ...response.data.data[0] });
    } catch (error) {}
  };

  const handleAddToCart = (id, size) => {
    const prevCart = localStorage.getItem(
      `orange-publicity-${productData.companyName}`
    )
      ? JSON.parse(
          localStorage.getItem(`orange-publicity-${productData.companyName}`)
        )
      : [];
    if (!prevCart.length) {
      localStorage.setItem(
        `orange-publicity-${productData.companyName}`,
        JSON.stringify([
          {
            ...productData,
            image: productData.image[0],
            quantity: 1,
            size: size,
          },
        ])
      );
    } else {
      let alreadyWithSameSize = prevCart.find(
        (product) => product._id === id && product.size === size
      );
      let remainingItems = prevCart.filter((product) => {
        if (product._id === id) {
          if (product.size !== size) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      });

      if (alreadyWithSameSize) {
        alreadyWithSameSize.quantity = alreadyWithSameSize.quantity + 1;
        //yedi katti ni remaining xaina bhane empty array ta halna bhayena ni haina
        if (remainingItems.length > 0) {
          localStorage.setItem(
            `orange-publicity-${productData.companyName}`,
            JSON.stringify([...remainingItems, alreadyWithSameSize])
          );
        } else {
          localStorage.setItem(
            `orange-publicity-${productData.companyName}`,
            JSON.stringify([alreadyWithSameSize])
          );
        }
      } else {
        localStorage.setItem(
          `orange-publicity-${productData.companyName}`,
          JSON.stringify([
            ...prevCart,
            {
              ...productData,
              image: productData.image[0],
              quantity: 1,
              size: size,
            },
          ])
        );
      }
    }
    toast.success("Producto añadido al carrito", {
      autoClose: 1000,
      toastId: "addedtocart",
    });
  };

  useEffect(() => {
    setphone(router.query.num);
    getProduct(router.query.id);
    // eslint-disable-next-line
  }, [router.isReady]);

  return (
    <>
      {!productData?.image ? (
        <div className={"loader-container"}>
          <Oval
            height="80"
            width="80"
            radius="9"
            color="#e06331"
            ariaLabel="three-dots-loading"
            style={{
              position: "absolute",
              transform: "translate(-50%, -50%)",
              top: "50%",
              left: "50%",
            }}
          />
        </div>
      ) : (
        <div className={` section-margin-bottom ${styles.container}`}>
          <BackBtnPop />
          {sizespop ? (
            <SizesPop
              setsizespop={setsizespop}
              id={productData._id}
              sizes={productData?.sizes}
              handleAddToCart={handleAddToCart}
            />
          ) : null}
          {productData?.image && (
            <>
              <div className={`${styles.imageContainer}`}>
                <DisplayImage imgdata={productData} />
              </div>
              <div className={styles.infoContainer}>
                <h1>{productData.name}</h1>
                <p>{productData.category}</p>
                <div className={styles.pricecontainer}>
                  {productData.discountPrice ? (
                    <>
                      <p className={styles.cross}>
                        ${formatCurrency(productData.price.toString())}
                      </p>
                      <p className={styles.discountedprice}>
                        ${formatCurrency(productData.discountPrice.toString())}
                      </p>
                    </>
                  ) : (
                    <p>${formatCurrency(productData.price.toString())}</p>
                  )}
                </div>
                <div>
                  {productData.model ? (
                    <>
                      <h2 className={styles.boldhead}>MODELO / REFERENCIA</h2>
                      <p>{productData.model}</p>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className={styles.descriptionContainer}>
                  {productData?.description ? (
                    <>
                      <h2 className={styles.boldhead}>DESCRIPCIÓN</h2>
                      {productData.description.includes("&&&") ? (
                        <>
                          <div>{productData.description.split("&&&")[0]}</div>
                          <div>
                            {productData.description
                              .split("&&&")[1]
                              .split("/")
                              .map((oneline) => {
                                return (
                                  <div
                                    className={styles.point}
                                    key={Math.random()}
                                  >
                                    {oneline}
                                  </div>
                                );
                              })}
                          </div>
                        </>
                      ) : (
                        <div>{productData.description}</div>
                      )}
                    </>
                  ) : null}
                </div>

                <div className={styles.descriptionContainer}>
                  {productData?.howToUse ? (
                    <>
                      <h2 className={styles.boldhead}>BENEFICIOS / VENTAJAS</h2>
                      <div>
                        {productData.howToUse.split("/").map((oneline) => {
                          return (
                            <div className={styles.point} key={Math.random()}>
                              {oneline}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ) : null}
                </div>

                <div className={styles.descriptionContainer}>
                  {productData?.servesFor ? (
                    <>
                      <h2 className={styles.boldhead}>
                        RECOMENDACIONES DE USO
                      </h2>
                      <div>
                        {productData.servesFor.split("/").map((oneline) => {
                          return (
                            <div className={styles.point} key={Math.random()}>
                              {oneline}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
              <div className={styles.buttonholder}>
                <div>
                  <button onClick={() => router.back()}>Comprar más</button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      if (productData.sizes) {
                        //pop sizes selection
                        setsizespop(true);
                      } else {
                        handleAddToCart(productData._id, "");
                      }
                    }}
                  >
                    {productData.buttonText}
                  </button>
                </div>
                <div>
                  <Link
                    href={{
                      pathname: "/cart",
                      query: {
                        companyName: productData.companyName,
                        num: phone,
                        // whatsapp: `${productData.whatsapp}`,
                      },
                    }}
                  >
                    <button>
                      {productData.checkoutText ? (
                        <>{productData.checkoutText}</>
                      ) : (
                        <>Check out</>
                      )}
                    </button>
                  </Link>
                </div>
              </div>
            </>
          )}
          <WhatsAppWId phone={phone} />
        </div>
      )}
    </>
  );
};

export default SingleProduct;
