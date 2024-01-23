import React, { useContext, useRef, useState } from "react";
import styles from "../../styles/Signup.module.css";
import styles2 from "./Product.module.css";
import styles3 from "../../styles/ButtonDesign.module.css";
import cookieCutter from "cookie-cutter";
import { toast } from "react-toastify";
import axios from "../api/axiosinterceptor";
import compressImage from "../../utilis/imageCompressor";
import BackBtnPop from "../../components/BackBtnPop";
import formatCurrency from "../../utilis/formatCurrency";

export default function Signup() {
  const optionals = [
    "model",
    "discountprice",
    "servesfor",
    "howtouse",
    "sizes",
  ];

  const formRef = useRef(null);
  const toastId = useRef(null);
  let errors = useRef({});

  const [errorstate, seterrorstate] = useState({});
  let sizes = "";
  const handleSubmit = async () => {
    toastId.current = toast.loading("Enviando pedido...", { autoClose: false });
    //combining sizes values
    const data = new FormData(formRef.current);

    for (let i = 0; i < 8; i++) {
      if (formRef.current[i + 13].value.trim("")) {
        sizes = `${sizes} / ${formRef.current[i + 13].value}`;
      }
      data.delete(formRef.current[i + 13].name);
    }
    errors = {};
    let imageArray = [];
    let description = "",
      descError = 0;

    for (const pair of data.entries()) {
      //description in part
      if (pair[0] === "description1") {
        description = `${pair[1]}`;
        if (pair[1] === "") {
          descError++;
        }
        data.delete("description1");
      }

      if (pair[0] === "image") {
        imageArray.push(pair[1]);
      }
      optionals.includes(pair[0])
        ? null
        : pair[1] === "" || pair[1] === ""
        ? (errors[`${pair[0]}`] = `${pair[0]} can't be empty `)
        : null;
    }

    for (const pair of data.entries()) {
      if (pair[0] === "description2") {
        if (pair[1] !== "") {
          description = `${description} &&& ${pair[1]}`;
          data.delete("description2");
        }
      }
    }
    //if one of the descrition field is empty then set error
    if (descError === 1) {
      errors.description = "Description field can't be empty";
    }
    //removind description1 and description2 and making it whole as description by joining them with triple &
    data.append("description", description);
    //set no image error
    if (imageArray[0].size === 0) {
      errors.image = "Image field can't be empty";
    }

    data.delete("image");
    //now compress images and set in data
    for (let i = 0; i < imageArray.length; i++) {
      let compressed = await compressImage(imageArray[i]);
      data.append("image", compressed, compressed.name);
    }
    //managing sizes
    for (const pair of data.entries()) {
      if (pair[0] === "sizes") {
        if (pair[1]) {
          let array = sizes.split("/").map((one, index) => {
            if (index == 0) {
              one = `${pair[1]}`;
            }
            return one;
          });
          sizes = array.join();
          data.delete("sizes");
        }
      }
    }
    data.append("sizes", sizes);

    seterrorstate({ ...errors });
    let length = Object.keys(errors).length;
    if (length !== 0) {
      //errror xa bhanee
      toast.update(toastId.current, {
        render: "Por favor complete los campos ",
        type: toast.TYPE.ERROR,
        autoClose: 1000,
        isLoading: false,
      });
    } else {
      try {
        await axios.post("/addproduct", data, {
          headers: {
            Authorization: `Bearer ${cookieCutter.get("accesstoken")}`,
          },
        });
        toast.update(toastId.current, {
          render: "Producto agregado con éxito",
          type: toast.TYPE.SUCCESS,
          autoClose: 1000,
          isLoading: false,
        });
      } catch (error) {
        error.response !== undefined
          ? toast.update(toastId.current, {
              render: error.response.data.msg,
              type: toast.TYPE.ERROR,
              autoClose: 1000,
              isLoading: false,
            })
          : toast.update(toastId.current, {
              render: "Failed ",
              type: toast.TYPE.ERROR,
              autoClose: 1000,
              isLoading: false,
            });
      }
    }
  };

  return (
    <div className={styles.signuppage1holder}>
      <BackBtnPop />
      {/* heading text section */}
      <div className={styles.toptext}>
        <div className={styles.largetext}>
          <h2>Agregar producto</h2>
        </div>
      </div>
      {/* second part */}
      <div className={styles2.formimageholder}>
        {/* form container */}
        <form className={styles.formholder} ref={formRef}>
          <div className={`${styles.singleinput} ${styles.double}`}>
            <div className={styles.name}>
              <label htmlFor="image">Cargar imágenes *</label>
              <input
                type="file"
                id="image"
                name="image"
                placeholder="Sin archivos seleccionados"
                className={styles.inputs}
                multiple
                accept="image/png, image/jpeg, image/jpg"
              />
              {errorstate?.image ? (
                <p className={styles.error}>Por favor complete este campo</p>
              ) : null}
            </div>
            <div className={styles.username}>
              <label htmlFor="name">Nombre del producto *</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Escribe el nombre del producto..."
                className={styles.inputs}
              />
              {errorstate.name ? (
                <p className={styles.error}>Por favor complete este campo</p>
              ) : null}
            </div>
          </div>
          <div className={`${styles.singleinput} ${styles.double}`}>
            <div className={styles.name}>
              <label htmlFor="price">Precio normal *</label>
              <input
                type="text"
                name="price"
                id="price"
                className={styles.inputs}
                onChange={(e) => {
                  e.target.value !== ""
                    ? (e.target.value = formatCurrency(
                        e.target.value.split(".").join("")
                      ))
                    : null;
                }}
                placeholder="Escribe el precio normal del producto..."
              />
              {/* <input type="number" id="price" name="price" placeholder="Product's price..." className={styles.inputs} /> */}
              {errorstate?.price ? (
                <p className={styles.error}>Por favor complete este campo</p>
              ) : null}
            </div>
            <div className={styles.name}>
              <label htmlFor="discountprice">Precio con descuento</label>
              <input
                type="text"
                name="discountprice"
                id="discountprice"
                className={styles.inputs}
                onChange={(e) => {
                  e.target.value !== ""
                    ? (e.target.value = formatCurrency(
                        e.target.value.split(".").join("")
                      ))
                    : null;
                }}
                placeholder="Escribe el precio con descuento..."
              />
            </div>
          </div>
          <div className={`${styles.singleinput} ${styles.double}`}>
            <div className={styles.name}>
              <label htmlFor="category">Nombre de la categoría *</label>
              <input
                type="text"
                id="category"
                name="category"
                placeholder="Escribe el nombre de la categoría..."
                className={styles.inputs}
              />
              {errorstate?.category ? (
                <p className={styles.error}>Por favor complete este campo</p>
              ) : null}
            </div>
            <div className={styles.username}>
              <label htmlFor="model">Modelo / Referencia</label>
              <input
                type="text"
                id="model"
                name="model"
                placeholder="Escribe el modelo o referencia del producto..."
                className={styles.inputs}
              />
            </div>
          </div>
          <div className={`${styles.singleinput} ${styles.double}`}>
            <div className={styles.name}>
              <label htmlFor="buttontext">
              Botón: agregar al carrito *
                {/* <span className={styles2.optionalfieldtext}> (optional)</span> */}
              </label>
              <input
                type="text"
                id="buttontext"
                name="buttontext"
                placeholder="Puedes elegir otro nombre para este botón"
                className={styles.inputs}
              />
              {errorstate?.buttontext ? (
                <p className={styles.error}>Por favor complete este campo</p>
              ) : null}
            </div>
            <div className={styles.name}>
              <label htmlFor="checkoutbuttontext">Botón: ver carrito *</label>
              <input
                type="text"
                id="checkoutbuttontext"
                name="checkoutbuttontext"
                placeholder="Puedes elegir otro nombre para este botón"
                className={styles.inputs}
              />
              {errorstate.checkoutbuttontext ? (
                <p className={styles.error}>Por favor complete este campo</p>
              ) : null}
            </div>
          </div>
          <div className={`${styles.singleinput} ${styles.double}`}>
            <div className={styles.name}>
              <label htmlFor="servesfor">Recomendaciones de uso</label>
              <input
                type="text"
                id="servesfor"
                name="servesfor"
                placeholder="renglón / renglón Escribe las recomendaciones de uso..."
                className={styles.inputs}
              />
            </div>
            <div className={styles.username}>
              <label htmlFor="howtouse"> Beneficios / Ventajas
              
              </label>
              <input
                type="text"
                id="howtouse"
                name="howtouse"
                placeholder="renglón / renglón Escribe los beneficios y/o ventajas del producto.. "
                className={styles.inputs}
              />
            </div>
          </div>
          <div className={`${styles.singleinput} ${styles.double}`}>
            <div className={styles.description}>
              <label htmlFor="description">Descripción *</label>
              <div className={styles2.multifieldholder}>
                <input
                  type="text"
                  id="description1"
                  name="description1"
                  placeholder="Escribe la descripción básica del producto..."
                  className={styles2.multiinputs}
                />
                <input
                  type="text"
                  id="description2"
                  name="description2"
                  placeholder="Descripción detallada por renglón / renglón"
                  className={styles2.multiinputs}
                />
              </div>

              {errorstate.description ? (
                <p className={styles.error}>Por favor complete este campo</p>
              ) : null}
            </div>
            <div className={styles.username}>
              <label htmlFor="sizes">
              Talla / medida / presentación / color / etc
              </label>
              <input
                type="text"
                id="sizes"
                name="sizes"
                placeholder="Escribe aquí la clasificación correspondiente..."
                className={styles.inputs}
              />
              <div className={styles.inputssizescontainer}>
                <div className={styles.doubleinput}>
                  <input
                    type="text"
                    id="sizes1"
                    name="sizes1"
                    placeholder="A"
                    // className={styles.inputs}
                  />
                  <input
                    type="text"
                    id="sizes2"
                    name="sizes2"
                    placeholder="B"
                    // className={styles.inputs}
                  />
                </div>
                <div className={styles.doubleinput}>
                  <input
                    type="text"
                    id="sizes3"
                    name="sizes3"
                    placeholder="C"
                    // className={styles.inputs}
                  />
                  <input
                    type="text"
                    id="sizes4"
                    name="sizes4"
                    placeholder="D"
                    // className={styles.inputs}
                  />
                </div>
                <div className={styles.doubleinput}>
                  <input
                    type="text"
                    id="sizes5"
                    name="sizes5"
                    placeholder="E"
                    // className={styles.inputs}
                  />
                  <input
                    type="text"
                    id="sizes6"
                    name="sizes6"
                    placeholder="F"
                    // className={styles.inputs}
                  />
                </div>
                <div className={styles.doubleinput}>
                  <input
                    type="text"
                    id="sizes7"
                    name="sizes7"
                    placeholder="G"
                    // className={styles.inputs}
                  />
                  <input
                    type="text"
                    id="sizes8"
                    name="sizes8"
                    placeholder="H"
                    // className={styles.inputs}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

            <div className={styles2.buttonholder}>
              <button onClick={handleSubmit}>
              Agregar
              </button>
            </div>
    </div>
  );
}
