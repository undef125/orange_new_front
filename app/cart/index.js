import React from "react";
import { useEffect, useContext, useState } from "react";
import axios from "../api/axiosinterceptor";
import ReactWhatsapp from "react-whatsapp";
import styles from "./cart.module.css";
import { useRouter } from "next/router";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import formatCurrency from "../../utilis/formatCurrency";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [phone, setphone] = useState("");
  const [message, setMessage] = useState("");
  const [buyer, setBuyer] = useState({
    name: "",
    number: "",
    city: "",
    country: "",
    deliveryaddress: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [totalPrice, setTotalPrice] = useState("");
  const [subTotalPrice, setsubTotalPrice] = useState("");

  const router = useRouter();

  const handleRemove = (id, size) => {
    const newCart = cartData.filter((item) => {
      if (item._id === id) {
        if (item.size === size) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    });

    setCartData(newCart);
    localStorage.setItem(
      `orange-publicity-${router.query.companyName}`,
      JSON.stringify(newCart)
    );
    toast.error("Producto eliminado del carrito", {
      autoClose: 1000,
      toastId: "removedfromcart",
    });
    setTotalPrice(
      cartData.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
  };

  useEffect(() => {
    setCartData(
      localStorage.getItem(`orange-publicity-${router.query.companyName}`)
        ? JSON.parse(
            localStorage.getItem(`orange-publicity-${router.query.companyName}`)
          )
        : []
    );

    setMessage(
      `Hola, soy *${buyer.name}*
      quiero hacer éste pedido a: *${router.query.companyName}*

      -------------------------
      *MI PEDIDO:*
${cartData
  .map(
    (item) =>
      ` > ${item.name} - Cantidad: *${item.quantity.toString()}* - ${
        item?.size
          ? `${item.sizes.split(",")[0]}: *${item.size.toString().trim("")}*`
          : ""
      } - Precio: *$ ${formatCurrency(
        (item.discountPrice
          ? item.discountPrice * item.quantity
          : item.price * item.quantity
        ).toString()
      )}* \n      `
  )
  .join("")}
      Total: *$ ${formatCurrency(subTotalPrice.toString())}*
      TOTAL A PAGAR: *$ ${formatCurrency(totalPrice.toString())}*
      -------------------------


      -------------------------
      *MI INFORMACIÓN:*
      *Nombre*: ${buyer.name}
      *Celular*: ${buyer.number}
      *Ciudad*: ${buyer.city}
      *País*: ${buyer.country}
${
  buyer.deliveryaddress
    ? `      *Dirección de entrega / observaciones:* ${buyer.deliveryaddress.split("").includes("#") ?   buyer.deliveryaddress.split("#").join("＃") : buyer.deliveryaddress} `
    : ""
}`
    );

    setTotalPrice(
      cartData.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
    // eslint-disable-next-line
  }, [router.query.companyName, buyer]);

  const handleChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleIncrease = (id, size) => {
    const newCart = cartData.map((item) =>
      item._id === id && item.size === size
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartData(newCart);
    localStorage.setItem(
      `orange-publicity-${router.query.companyName}`,
      JSON.stringify(newCart)
    );
    setTotalPrice(
      cartData.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
  };

  const addBuyer = async () => {
    try {
      await axios.post("/addbuyer", {
        ...buyer,
        companyName: cartData[0].companyName,
      });
    } catch (error) {}
  };

  const handleDecrease = (id, size) => {
    const toDecrease = cartData.find(
      (item) => item._id === id && item.size === size
    );
    if (toDecrease.quantity === 1) {
      handleRemove(id, size);
    } else {
      const newCart = cartData.map((item) =>
        item._id === id && item.size === size
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setCartData(newCart);
      localStorage.setItem(
        `orange-publicity-${router.query.companyName}`,
        JSON.stringify(newCart)
      );
    }
    setTotalPrice(
      cartData.reduce(
        (acc, item) =>
          acc + item.discountPrice
            ? item.discountPrice * item.quantity
            : item.price * item.quantity,
        0
      )
    );
  };

  useEffect(() => {
    setsubTotalPrice(
      cartData.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
    setTotalPrice(
      cartData.reduce(
        (acc, item) =>
          item.discountPrice
            ? acc + item.discountPrice * item.quantity
            : acc + item.price * item.quantity,
        0
      )
    );
  }, [cartData]);

  useEffect(() => {
    setphone(router.query.num);
  }, [router.isReady]);

  return (
    <ChakraProvider>
      <div className={styles.shoppingcart}>
        {cartData.length > 0 ? (
          <>
            <div className="column-labels">
              <label className="product-imagename">IMAGEN</label>
              <label className="product-details">NOMBRE DEL PRODUCTO</label>
              <label className="product-price">CANTIDAD</label>
              <label className="product-price">PRECIO</label>
              <label className="product-price">CLASIFICACIÓN</label>
              <label className="product-rem">ELIMINAR PRODUCTO</label>
            </div>
            <div className={styles.allproductcontainer}>
              {cartData.map((item, index) => (
                <div className={styles.productcontainer} key={index}>
                  <div className={styles.imagecontainer}>
                    <img
                    style={{height: "100%", width: "100%", objectFit: "cover"}}
                      src={`data:${item.image.contentType};base64, ${item.image.data}`}
                    />
                  </div>
                  <div className={styles.detailcontainer}>
                    <div className="product-title">{item.name}</div>
                    {/* <p className="product-description">{item.description}</p> */}
                  <div
                    className="product-quantity"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "20px",
                    }}
                  >
                    <AiFillMinusCircle
                      onClick={() => handleDecrease(item._id, item.size)}
                      style={{ cursor: "pointer", fontSize: "20px" }}
                      />
                    {item.quantity}
                    <AiFillPlusCircle
                      onClick={() => handleIncrease(item._id, item.size)}
                      style={{ cursor: "pointer", fontSize: "20px" }}
                      />
                  </div>
                  {item.discountPrice ? (
                    <div className="product-price">
                      ${formatCurrency(item.discountPrice.toString())}
                    </div>
                  ) : (
                    <div className="product-price">
                      ${formatCurrency(item.price.toString())}
                    </div>
                  )}
                  <div className={styles.sizecontainer}>
                    <p>{item?.sizes?.split(",")[0]}</p>
                    <p>{item.size}</p>
                  </div>
                  </div>

                  <div className={styles.removeholder}>
                    <button
                    style={{color: "red"}}
                      className="remove-product"
                      onClick={() => handleRemove(item._id, item.size)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <h2 style={{marginTop: "4rem"}}> El carrito esta vacío</h2>
        )}
        <div className={styles.priceContainer}>
          <h2>
            <b> TOTAL </b>: $ {formatCurrency(subTotalPrice.toString())}{" "}
          </h2>

          <h2>
            <b> TOTAL A PAGAR </b> : $ {formatCurrency(totalPrice.toString())}{" "}
          </h2>
        </div>
        <div className={styles.whatsappContainer}>
          <button
            onClick={onOpen}
            disabled={cartData.length > 0 ? false : true}
            className={styles.realizarbtn}
          >
            Realizar pedido
          </button>
          <button
            onClick={() => {
              router.push(`/${router.query.companyName.trim("").split("").includes(" ") ? router.query.companyName?.trim("").split(" ").join("-") : router.query.companyName?.trim("")}`)
            }}
            className={styles.realizarbtn}
          >
            Comprar más
          </button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader className={styles.modalHeader}>
                Ingresa tus datos para realizar el pedido
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="user-details">
                  <div className="input-box">
                    <span className={styles.details}>Nombre *</span>
                    <input
                      type="text"
                      placeholder="Escribe tu nombre..."
                      value={buyer.name}
                      onChange={(e) => handleChange(e)}
                      name="name"
                    />
                  </div>
                  <div className="input-box">
                    <span className={styles.details}>Teléfono o WhatsApp *</span>
                    <input
                      type="number"
                      placeholder="Escribe tu número aquí..."
                      value={buyer.number}
                      onChange={(e) => handleChange(e)}
                      name="number"
                    />
                  </div>

                  <div className={`input-box ${styles.doubleinput}`}>
                    <div>
                      <span className={styles.details}>Ciudad *</span>
                      <input
                        type="text"
                        placeholder="Escribe tu ciudad..."
                        value={buyer.city}
                        onChange={(e) => handleChange(e)}
                        name="city"
                      />
                    </div>
                    <div>
                      <span className={styles.details}>País</span>
                      <input
                        type="text"
                        placeholder="Escribe tu país..."
                        value={buyer.country}
                        onChange={(e) => handleChange(e)}
                        name="country"
                      />
                    </div>
                  </div>

                  <div className="input-box">
                    <span className={styles.details}>
                    Dirección de entrega / observaciones
                    </span>
                    <input
                      type="text"
                      placeholder="Escribe la dirección de entrega u observación..."
                      value={buyer.deliveryaddress}
                      onChange={(e) => handleChange(e)}
                      name="deliveryaddress"
                    />
                  </div>
                </div>
                <ReactWhatsapp
                  number={phone}
                  disabled={
                    buyer.name && buyer.city && buyer.number ? false : true
                  }
                  message={message}
                  style={{
                    marginTop: "1rem",
                    backgroundColor: "orange",
                    color: "white",
                    borderRadius: "5px",
                    cursor: "pointer",
                    zIndex: "2",
                    padding: "2px 10px",
                    fontSize: "20px",
                    border: "1px solid gray",
                  }}
                  onClick={addBuyer}
                >
                  Realizar pedido
                </ReactWhatsapp>
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </ChakraProvider>
  );
};

export default Cart;
