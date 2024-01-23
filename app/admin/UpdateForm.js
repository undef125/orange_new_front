import React from 'react';
import { useRef, useState } from 'react';
import styles2 from "./Product.module.css";
import styles3 from "../../styles/Pop.module.css"
import styles from "../../styles/Signup.module.css";
import Image from 'next/image';
import { useEffect } from 'react';
import axios from "../api/axiosinterceptor";
import cookieCutter from "cookie-cutter";
import { toast } from 'react-toastify';
import compressImage from '../../utilis/imageCompressor';
import formatCurrency from '../../utilis/formatCurrency';

export default function UpdateForm({ pop, setpop, product, setrerender, rerender }) {
    const optionals = ["model", "discountprice", "servesfor", "howtouse","sizes"];

    const formRef = useRef(null);
    const toastId = useRef(null);
    let errors = useRef({});

    const [errorstate, seterrorstate] = useState({});
    let sizes = ""
    const handleSubmit = async (e) => {
        errors = {};
        toastId.current = toast.loading("Enviando pedido...", { autoClose: false })
        e.preventDefault();
        let imageArray = [];
        const data = new FormData(formRef.current);
        let description = "",
            descError = 0, sizes = "";
            
        for (let i = 0; i < 8; i++) {
            if (formRef.current[i + 13].value.trim("")) {
                sizes = `${sizes} / ${formRef.current[i + 13].value}`;
            }
            data.delete(formRef.current[i + 13].name);
        }
        for (const pair of data.entries()) {
            //description in part
            if (pair[0] === "description1") {
                description = `${pair[1]}`;
                if (pair[1] === "") {
                    descError++;
                }
                data.delete("description1");
            }
            optionals.includes(pair[0])
                ? null
                : pair[1] === "" || pair[1] === ""
                    ? (errors[`${pair[0]}`] = `${pair[0]} can't be empty `)
                    : null;
        }

        for (const pair of data.entries()) {
            if (pair[0] === "description2") {
              if(pair[1] !== "") {
                description = `${description} &&& ${pair[1]}`;
                data.delete("description2");
              }
            }
          }
          data.append("description", description);


        if (descError === 1) {
            errors.description = "Description field can't be empty";
        }
        ;
        for (const pair of data.entries()) {
            if (pair[0] === "image") {
                imageArray.push(pair[1]);
            }
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
                    })
                    sizes = array.join();
                    data.delete("sizes");
                }
            }
        }
        data.append("sizes", sizes);
        
        seterrorstate({ ...errors });
        let length = Object.keys(errors).length;
        if (length != 0) {
            toast.update(toastId.current, {
                render: "Por favor complete los campos ",
                type: toast.TYPE.ERROR,
                autoClose: 1000,
                isLoading: false,
            });
        } else {
            try {
                await axios.put(`/updateproduct/${product._id}`, data, {
                    headers: {
                        Authorization: `Bearer ${cookieCutter.get("accesstoken")}`
                    }
                });
                toast.update(toastId.current, { render: "Producto actualizado", type: toast.TYPE.SUCCESS, autoClose: 1000, isLoading: false })
                setrerender(!rerender);
                setpop(false);

            } catch (error) {
                toast.update(toastId.current, { render: "Error al actualizar el producto", type: toast.TYPE.ERROR, autoClose: 1000, isLoading: false })
            }

        }
    }

    useEffect(() => {
        let descpara = "", despoints = "";
        if (product.description.includes("&&&")) {
            descpara = product.description.split("&&&")[0];
            despoints = product.description.split("&&&")[1];
        } else {
            descpara = product.description;
        }
        formRef.current[1].value = product.name;
        formRef.current[2].value = product.price;
        formRef.current[3].value = product.discountPrice ? product.discountPrice : "";
        formRef.current[4].value = product.category;
        formRef.current[5].value = product.model;
        formRef.current[6].value = product.buttonText;
        formRef.current[7].value = product.checkoutText;
        formRef.current[8].value = product.servesFor;
        formRef.current[9].value = product.howToUse;
        formRef.current[10].value = descpara;
        formRef.current[11].value = despoints;
        formRef.current[12].value = product.sizes ? product.sizes.split(",")[0] : null;
        formRef.current[13].value = product?.sizes?.split(",")[1] ? product.sizes.split(",")[1] : null;
        formRef.current[14].value = product?.sizes?.split(",")[2] ? product.sizes.split(",")[2] : null;
        formRef.current[15].value = product?.sizes?.split(",")[3] ? product.sizes.split(",")[3] : null;
        formRef.current[16].value = product?.sizes?.split(",")[4] ? product.sizes.split(",")[4] : null;
        formRef.current[17].value = product?.sizes?.split(",")[5] ? product.sizes.split(",")[5] : null;
        formRef.current[18].value = product?.sizes?.split(",")[6] ? product.sizes.split(",")[6] : null;
        formRef.current[19].value = product?.sizes?.split(",")[7] ? product.sizes.split(",")[7] : null;
        formRef.current[20].value = product?.sizes?.split(",")[8] ? product.sizes.split(",")[8] : null;
    }, [])
    return (
        <div className={styles3.popcontainerupdateform}>
            <div className={styles3.pop}>
                <div className={styles3.crossholder}>
                    <Image
                        src="/cross.png"
                        height="20"
                        width="20"
                        onClick={() => setpop(false)}
                    />
                </div>
                <form className={styles.formholder} ref={formRef} onSubmit={handleSubmit}>
                    <div className={`${styles.singleinput} ${styles.double}`}>
                        <div className={styles.name}>
                            <label htmlFor="image">Cargar imágenes</label>
                            <input type="file" id="image" name="image" placeholder="Select images" className={styles.inputs} multiple accept="image/png, image/jpeg, image/jpg, image/heic" />
                        </div>
                        <div className={styles.username}>
                            <label htmlFor="name">Nombre del producto</label>
                            <input type="text" id="name" name="name" placeholder="Escribe el nombre del producto..." className={styles.inputs} />
                            {errorstate.name ? (
                                <p className={styles.error}>Por favor complete este campo</p>
                            ) : null}
                        </div>
                    </div>
                    <div className={`${styles.singleinput} ${styles.double}`}>
                        <div className={styles.name}>
                            <label htmlFor="price">Precio normal</label>
                            <input
                                type="text"
                                name="price"
                                id="price"
                                className={styles.inputs}
                                onChange={(e) => {
                                    e.target.value !== "" ? (e.target.value = formatCurrency(e.target.value.split(".").join(""))) : null
                                }}
                                placeholder="Escribe el precio normal del producto..."
                            />
                        </div>
                        <div className={styles.name}>
                            <label htmlFor="discountprice">Precio con descuento</label>
                            <input
                                type="text"
                                name="discountprice"
                                id="discountprice"
                                className={styles.inputs}
                                onChange={(e) => {
                                    e.target.value !== "" ? (e.target.value = formatCurrency(e.target.value.split(".").join(""))) : null
                                }}
                                placeholder="Escribe el precio con descuento..."
                            />
                            {/* <input type="number" id="discountprice" name="discountprice" placeholder="Product's price..." className={styles.inputs} /> */}
                        </div>
                    </div>
                    <div className={`${styles.singleinput} ${styles.double}`}>
                        <div className={styles.name}>
                            <label htmlFor="category">Nombre de la categoría</label>
                            <input type="text" id="category" name="category" placeholder="Escribe el nombre de la categoría..." className={styles.inputs} />
                        </div>

                        <div className={styles.username}>
                            <label htmlFor="model">Modelo / Referencia</label>
                            <input type="text" id="model" name="model" placeholder="Escribe el modelo o referencia del producto..." className={styles.inputs} />
                        </div>
                    </div>
                    <div className={`${styles.singleinput} ${styles.double}`}>
                        <div className={styles.name}>
                            <label htmlFor="buttontext">Botón: agregar al carrito</label>
                            <input type="text" id="buttontext" name="buttontext" placeholder="Puedes elegir otro nombre para este botón" className={styles.inputs} />
                        </div>
                        <div className={styles.name}>
                            <label htmlFor="checkouttext">Botón: ver carrito</label>
                            <input
                                type="text"
                                id="checkouttext"
                                name="checkouttext"
                                placeholder="Puedes elegir otro nombre para este botón"
                                className={styles.inputs}
                            />

                        </div>
                    </div>
                    <div className={`${styles.singleinput} ${styles.double}`}>
                        <div className={styles.name}>
                            <label htmlFor="servesfor">Recomendaciones de uso </label>
                            <input
                                type="text"
                                id="servesfor"
                                name="servesfor"
                                placeholder="renglón / renglón Escribe las recomendaciones de uso..."
                                className={styles.inputs}
                            />

                        </div>
                        <div className={styles.username}>
                            <label htmlFor="howtouse">
                             Beneficios / Ventajas 
                            </label>
                            <input
                                type="text"
                                id="howtouse"
                                name="howtouse"
                                placeholder="renglón / renglón Escribe los beneficios y/o ventajas del producto.."
                                className={styles.inputs}
                            />
                        </div>
                    </div>
                    <div className={`${styles.singleinput} ${styles.double}`}>
                        <div className={styles.description}>
                            <label htmlFor="description">Descripción</label>
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
                    <div className={styles3.actualizarbtnholder}>
                        <input type="submit" value="Actualizar" />
                    </div>
                </form>
            </div>
        </div>
    )
}
