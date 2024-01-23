import React, { useRef, useState } from "react";
import styles from "../../styles/Signup.module.css";
import styles2 from "./Product.module.css";
import styles3 from "../../styles/ButtonDesign.module.css";
import cookieCutter from "cookie-cutter";
import { toast } from "react-toastify";
import axios from "../api/axiosinterceptor";
import BackBtnPop from "../../components/BackBtnPop";
import { useEffect } from "react";
import compressImage from "../../utilis/imageCompressor";

export default function Signup() {
  const formRef = useRef(null);
  const toastId = useRef(null);
  let errors = useRef({});
  let imageArray = [];
  let imagesArray = [];
  const requiredKeys = [
    "description",
    "short",
    "address",
    "email",
    "phone",
    "postalCode",
  ];

  const [errorstate, seterrorstate] = useState({});
  const [companyDetails, setCompanyDetails] = useState([]);

  let sizes = "";

  const setValuesAlready = ([data]) => {
    formRef.current[2].value = data.description;
    formRef.current[3].value = data.shortReview;
    formRef.current[4].value = data.address;
    formRef.current[5].value = data.email;
    formRef.current[6].value = data.phone;
    formRef.current[7].value = data.postalCode;
    formRef.current[8].value = data.socialMedias.facebook
      ? data.socialMedias.facebook
      : "";
    formRef.current[9].value = data.socialMedias.instagram
      ? data.socialMedias.instagram
      : "";
    formRef.current[10].value = data.socialMedias.youtube
      ? data.socialMedias.youtube
      : "";
    formRef.current[11].value = data.socialMedias.twitter
      ? data.socialMedias.twitter
      : "";
    formRef.current[12].value = data.socialMedias.website
      ? data.socialMedias.website
      : "";
    formRef.current[13].value = data.socialMedias.tiktok
      ? data.socialMedias.tiktok
      : "";
    formRef.current[14].value = data.location ? data.location : "";
    formRef.current[15].value = data.countrydetails ? data.countrydetails : "";
  };

  const getCompanyDetail = async () => {
    try {
      let resp = await axios.get("/getcompanydetails", {
        headers: {
          Authorization: `Bearer ${cookieCutter.get("accesstoken")}`,
        },
      });
      setCompanyDetails(resp.data.data);
      setValuesAlready(resp.data.data);
    } catch (error) {}
  };

  const deleteAllImages = async (e) => {
    toastId.current = toast.loading("Enviando pedido...", { autoClose: false });
    e.preventDefault();
    try {
      await axios.put(
        "/removeallstoreimages",
        {
          cname: companyDetails[0].companyName,
        },
        {
          headers: {
            Authorization: `Bearer ${cookieCutter.get("accesstoken")}`,
          },
        }
      );
      toast.update(toastId.current, {
        render: "¡Borrado exitosamente! ",
        type: toast.TYPE.SUCCESS,
        autoClose: 1000,
        isLoading: false,
      });
    } catch (error) {
      toast.update(toastId.current, {
        render: "Error al eliminar imágenes",
        type: toast.TYPE.ERROR,
        autoClose: 1000,
        isLoading: false,
      });
    }
  };

  const handleSubmit = async () => {
    errors = {};
    toastId.current = toast.loading("Enviando pedido...", { autoClose: false });
    //combining sizes values
    const data = new FormData(formRef.current);

    for (const pair of data.entries()) {
      if (requiredKeys.includes(pair[0])) {
        if (pair[1].trim() === "") {
          errors[`${pair[0]}`] = "Can't be empty";
        }
      }
      if (pair[0] === "coverImage") {
        if (pair[1].size !== 0) {
          imageArray.push({
            name: "coverImage",
            file: pair[1],
          });
        }
      }
      if (pair[0] === "logoImage") {
        if (pair[1].size !== 0) {
          imageArray.push({
            name: "logoImage",
            file: pair[1],
          });
        }
      }
      if (pair[0] === "image") {
        if (pair[1].length !== 0) {
          imagesArray.push({
            name: "image",
            file: pair[1],
          });
        }
      }
    }
    data.delete("coverImage");
    data.delete("logoImage");
    data.delete("image");
    //compressing logo

    for (let i = 0; i < imageArray.length; i++) {
      if (imageArray[i]?.file.size !== 0) {
        let compressed = await compressImage(imageArray[i].file);
        data.append(`${imageArray[i]?.name}`, compressed, compressed.name);
      }
    }
    let compressedImages = [];
    for (let i = 0; i < imagesArray.length; i++) {
      if (imagesArray[i]?.file.size !== 0) {
        let compressed = await compressImage(imagesArray[i].file);
        // compressedImages.push(compressed, compressed.name);
        data.append(`image`, compressed, compressed.name);
      }
    }

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
        await axios.post("/updatecompanydetails", data, {
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
              render: "Fallido ",
              type: toast.TYPE.ERROR,
              autoClose: 1000,
              isLoading: false,
            });
      }
    }
  };

  useEffect(() => {
    getCompanyDetail();
  }, []);

  return (
    <div className={styles.signuppage1holder}>
      <BackBtnPop />
      {/* heading text section */}
      <div className={styles.toptext}>
        <div className={styles.largetext} style={{ marginTop: ".5rem", marginBottom: "0rem"}}>
          <h2>Edita la información de tu Negocio</h2>
        </div>
      </div>
      {/* second part */}
      <div className={styles2.formimageholder} style={{ marginTop: "15px" }}>
        {/* form container */}
        <form className={styles.formholder} ref={formRef}>
          <div className={`${styles.singleinput} ${styles.double}`}>
            <div className={styles.name}>
              <label htmlFor="coverimage">Imagen de portada</label>
              <input
                type="file"
                id="coverimage"
                name="coverImage"
                placeholder="Sin archivos seleccionados"
                className={styles.inputs}
                multiple
                accept="image/png, image/jpeg, image/jpg"
              />
            </div>
            <div className={styles.name}>
              <label htmlFor="logoimage">Logo de tu empresa </label>
              <input
                type="file"
                id="logoimage"
                name="logoImage"
                placeholder="Sin archivos seleccionados"
                className={styles.inputs}
                multiple
                accept="image/png, image/jpeg, image/jpg"
              />
            </div>
          </div>
          <div className={`${styles.singleinput} ${styles.double}`}>
            <div className={styles.name}>
              <label htmlFor="description">
                Descripción corta de la empresa{" "}
              </label>
              <input
                type="text"
                name="description"
                id="description"
                className={styles.inputs}
                placeholder="Product's price..."
              />
              {errorstate?.description ? (
                <p className={styles.error}>Por favor complete este campo</p>
              ) : null}
            </div>
            <div className={styles.name}>
              <label htmlFor="short">
                Slogan del negocio (Máx. 50 carácteres)
              </label>
              <input
                type="text"
                name="shortReview"
                id="short"
                className={styles.inputs}
                placeholder="Slogan del negocio"
              />
              {errorstate?.short ? (
                <p className={styles.error}>Por favor complete este campo</p>
              ) : null}
            </div>
          </div>
          <div className={`${styles.singleinput} ${styles.double}`}>
            <div className={styles.name}>
              <label htmlFor="address">Dirección </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Dirección"
                className={styles.inputs}
              />
              {errorstate?.address ? (
                <p className={styles.error}>Por favor complete este campo</p>
              ) : null}
            </div>
            <div className={styles.username}>
              <label htmlFor="email">
                E-mail
                <span className={styles2.optionalfieldtext}> (optional)</span>
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="E-mail"
                className={styles.inputs}
              />
              {errorstate?.email ? (
                <p className={styles.error}>Por favor complete este campo</p>
              ) : null}
            </div>
          </div>
          <div className={`${styles.singleinput} ${styles.double}`}>
            <div className={styles.name}>
              <label htmlFor="phone">WhatsApp</label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="WhatsApp"
                className={styles.inputs}
              />
              {errorstate?.phone ? (
                <p className={styles.error}>Por favor complete este campo</p>
              ) : null}
            </div>
            <div className={styles.name}>
              <label htmlFor="postalCode">Código postal</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                placeholder="Código postal"
                className={styles.inputs}
              />
              {errorstate?.postalCode ? (
                <p className={styles.error}>Por favor complete este campo</p>
              ) : null}
            </div>
          </div>
          <div className={`${styles.singleinput} ${styles.double}`}>
            <div className={styles.facebook}>
              <label htmlFor="facebook">Facebook </label>
              <input
                type="text"
                id="facebook"
                name="facebook"
                placeholder="Facebook"
                className={styles.inputs}
              />
            </div>
            <div className={styles.instagram}>
              <label htmlFor="instagram">Instagram</label>
              <input
                type="text"
                id="instagram"
                name="instagram"
                placeholder="Instagram"
                className={styles.inputs}
              />
            </div>
          </div>
          <div className={`${styles.singleinput} ${styles.double}`}>
            <div className={styles.facebook}>
              <label htmlFor="youtube">Youtube </label>
              <input
                type="text"
                id="youtube"
                name="youtube"
                placeholder="Youtube"
                className={styles.inputs}
              />
            </div>
            <div className={styles.instagram}>
              <label htmlFor="twitter">Twitter</label>
              <input
                type="text"
                id="twitter"
                name="twitter"
                placeholder="Twitter"
                className={styles.inputs}
              />
            </div>
          </div>
          <div className={`${styles.singleinput} ${styles.double}`}>
            <div className={styles.facebook}>
              <label htmlFor="website">Ingresa tu sitio web </label>
              <input
                type="text"
                id="website"
                name="website"
                placeholder="Ingresa tu sitio web"
                className={styles.inputs}
              />
            </div>
            <div className={styles.instagram}>
              <label htmlFor="tiktok">Tiktok</label>
              <input
                type="text"
                id="tiktok"
                name="tiktok"
                placeholder="Tiktok"
                className={styles.inputs}
              />
            </div>
          </div>
          <div className={`${styles.singleinput} ${styles.double}`}>
            <div className={styles.name}>
              <label htmlFor="location">Ubicación en Google Maps</label>
              <input
                type="text"
                name="location"
                id="location"
                className={styles.inputs}
                placeholder="Ubicación en Google Maps"
              />
              {errorstate?.description ? (
                <p className={styles.error}>Por favor complete este campo</p>
              ) : null}
            </div>
            <div className={styles.name}>
              <label htmlFor="countrydetails">Ciudad, Estado y País</label>
              <input
                type="text"
                name="countrydetails"
                id="countrydetails"
                className={styles.inputs}
                placeholder="Ciudad, Estado y País"
              />
              {errorstate?.description ? (
                <p className={styles.error}>Por favor complete este campo</p>
              ) : null}
            </div>
          </div>
          <div className={`${styles.singleinput} ${styles.double}`}>
            <div className={styles.name}>
              <label htmlFor="image">
                Fotos de tu negocio - máximo 20 fotos
              </label>
              <input
                type="file"
                id="image"
                name="image"
                placeholder="Upload images of physical store..."
                className={styles.inputs}
                multiple
                accept="image/png, image/jpeg, image/jpg"
              />
            </div>
            <div className={styles.deletebtn}>
              <button onClick={deleteAllImages}>
                Eliminar todas las imágenes de tu Negocio
              </button>
            </div>
          </div>
        </form>
      </div>
            <div className={styles2.buttonholder}>
              <button  onClick={handleSubmit}>
                Actualizar información
              </button>
            </div>
    </div>
  );
}
