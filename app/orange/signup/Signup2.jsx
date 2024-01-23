import Link from "next/link";
import React, { useContext, useRef, useState, useEffect } from "react";
import { IndexContext } from "../../../context";
import styles from "@/styles/Signup.module.css";
import styles2 from "@/styles/Signup2.module.css";
import styles3 from "@/styles/ButtonDesign.module.css";
import axios from "../../api/axiosinterceptor";
import Router from "next/router";
import { toast } from "react-toastify";
// import compressImage from "../../utilis/imageCompressor";

const Signup2 = ({ passwordShow, setPasswordShow }) => {
  const optionals = [
    "facebook",
    "instagram",
    "tiktok",
    "twitter",
    "website",
    "youtube",
  ];
  let checkboxRef = useRef();
  const formRef = useRef();
  const toastId = useRef(null);
  let errors = useRef({});

  const [errorstate, seterrorstate] = useState({});

  // const { signupData, setSignupData } = useContext(IndexContext);

  const handleSubmit = async () => {
    //check if signupdata is filled cause it can be route directly
    toastId.current = toast.loading("Enviando pedido...", { autoClose: false });
    try {
      for (const pair of signupData.entries()) {
      }
      //aba yo thik xa bhane aagadi ko kam garne natra else ma route to signup page
      const data = new FormData(formRef.current);
      errors = {};
      for (const pair of data.entries()) {
        optionals.includes(pair[0])
          ? null
          : pair[1] === ""
          ? (errors[`${pair[0]}`] = `${pair[0]} can't be empty `)
          : null;
      }
      seterrorstate({ ...errors });
      let length = Object.keys(errors).length;
      if (length !== 0) {
        //errror xa bhanee
      } else {
        //append two form datas
        let alreadyAppended = false;
        for (var pair of signupData.entries()) {
          if (pair[0] === "country") {
            alreadyAppended = true;
          }
        }
        if (!alreadyAppended) {
          for (var pair of signupData.entries()) {
            data.append(pair[0], pair[1]);
          }
        }

        //signup gar
        try {
          //compressing imagesss
          for (let pair of data.entries()) {
            if (pair[0] === "coverimage" && pair[1].size > 0) {
              let compressed = await compressImage(pair[1]);
              data.delete("coverimage");
              data.append("coverimage", compressed, compressed.name);
              break;
            }
          }
          for (let pair of data.entries()) {
            if (pair[0] === "logoimage" && pair[1].size > 0) {
              let compressed = await compressImage(pair[1]);
              data.delete("logoimage");
              data.append("logoimage", compressed, compressed.name);
              break;
            }
          }

          await axios.post("/register", data);
          toast.update(toastId.current, {
            render: "Registro realizado con éxito",
            type: toast.TYPE.SUCCESS,
            autoClose: 1000,
            isLoading: false,
          });
          Router.push("/login");
        } catch (error) {
          error.response !== undefined
            ? toast.update(toastId.current, {
                render: error.response.data.msg,
                type: toast.TYPE.ERROR,
                autoClose: 1000,
                isLoading: false,
              })
            : // error.error.keyValue.includes()
              toast.update(toastId.current, {
                render: "¡Error al registrarse! ",
                type: toast.TYPE.ERROR,
                autoClose: 1000,
                isLoading: false,
              });
        }
      }
    } catch (error) {
      toast.error("¡Por favor, no enrute directamente!", {
        autoClose: 1000,
        toastId: "don't route directly",
      });
      Router.push("/login/Signup");
    }
  };

  const inputStyle =
    "focus:border-orange-500 focus:outline-none px-2 text-[.9rem] md:text-[1.2rem]  border-2 rounded-lg border-orange-200 w-[95vw] md:w-[38rem] lg:w-[24rem] xl:w-[30rem] 2xl:w-[36rem] h-[2.5rem]";

  return (
    <>
      <div className="flex flex-wrap gap-y-2 lg:gap-y-4 lg:grid lg:grid-cols-2 ">
        <div className="flex flex-col">
          <label htmlFor="country" className="text-[.9rem] md:text-[1.2rem]">
            País *
          </label>
          <input
            type="text"
            id="country"
            name="country"
            placeholder="Escribe el país..."
            className={inputStyle}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="postalcode" className="text-[.9rem] md:text-[1.2rem]">
            Código postal *
          </label>{" "}
          <input
            type="number"
            id="postalcode"
            name="postalcode"
            placeholder="Escribe el Código postal..."
            className={inputStyle}
          />
        </div>
        <div className="flex gap-[1vw] md:gap-[1rem]">
          <div className="flex flex-col">
            <label
              htmlFor="stateprovince"
              className="text-[.9rem] md:text-[1.2rem]"
            >
              Estado/Provincia *
            </label>
            <input
              type="text"
              id="stateprovince"
              name="stateprovince"
              placeholder="Estado / Provincia / Departamento..."
              className="focus:border-orange-500 focus:outline-none px-2 text-[.9rem] md:text-[1.2rem]  border-2 rounded-lg border-orange-200 w-[47vw] md:w-[18.5rem] lg:w-[11.5rem] xl:w-[14.5rem] 2xl:w-[17.5rem] h-[2.5rem]"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="city" className="text-[.9rem] md:text-[1.2rem]">
              Ciudad *
            </label>{" "}
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Escribe la ciudad..."
              className="focus:border-orange-500 focus:outline-none px-2 text-[.9rem] md:text-[1.2rem]  border-2 rounded-lg border-orange-200 w-[47vw] md:w-[18.5rem] lg:w-[11.5rem] xl:w-[14.5rem] 2xl:w-[17.5rem] h-[2.5rem]"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-[.9rem] md:text-[1.2rem]"
          >
            Descripción completa de la empresa *
          </label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Escribe la descripción completa de tu empresa..."
            className={`${inputStyle}`}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="short" className="text-[.9rem] md:text-[1.2rem]">
            Reseña corta de la empresa *
          </label>
          <input
            type="text"
            id="short"
            name="short"
            placeholder="Escribe una reseña corta de tu empresa..."
            className={`${inputStyle}`}
          />
        </div>

        <div className="flex flex-col">
          <div className="flex gap-[1vw] md:gap-[1rem]">
            <div className="flex flex-col">
              <label
                htmlFor="coverimage"
                className="text-[.9rem] md:text-[1.2rem]"
              >
                Imagen de portada
              </label>
              <input
                type="file"
                id="coverimage"
                name="coverImage"
                placeholder="State/Province"
                className="focus:border-orange-500 focus:outline-none px-2 text-[.9rem] md:text-[1.2rem]  border-2 rounded-lg border-orange-200 w-[47vw] md:w-[18.5rem] lg:w-[11.5rem] xl:w-[14.5rem] 2xl:w-[17.5rem] h-[2.5rem]"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="logoimage"
                className="text-[.9rem] md:text-[1.2rem]"
              >
                Logo de tu empresa
              </label>{" "}
              <input
                type="file"
                id="logoimage"
                name="logoImage"
                placeholder="City"
                className="focus:border-orange-500 focus:outline-none px-2 text-[.9rem] md:text-[1.2rem]  border-2 rounded-lg border-orange-200 w-[47vw] md:w-[18.5rem] lg:w-[11.5rem] xl:w-[14.5rem] 2xl:w-[17.5rem] h-[2.5rem]"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <label
              htmlFor="telephonenum"
              className="text-[.9rem] md:text-[1.2rem]"
            >
              Teléfono de contacto *
            </label>
            <div className="flex gap-[1vw] md:gap-[1rem]">
              <input
                type="number"
                id="telephonecc"
                name="telephonecc"
                placeholder="+1"
                className="focus:border-orange-500 focus:outline-none px-2 text-[.9rem] md:text-[1.2rem]  border-2 rounded-lg border-orange-200 w-[15vw] md:w-[5rem]  lg:w-[4rem] xl:w-[5rem] 2xl:w-[5rem] h-[2.5rem]"
              />
              {/* lg:w-[24rem] xl:w-[30rem] 2xl:w-[36rem] */}
              <input
                type="number"
                id="telephonenum"
                name="telephonenum"
                placeholder="Escribe tu número de teléfono..."
                className="focus:border-orange-500 focus:outline-none px-2 text-[.9rem] md:text-[1.2rem]  border-2 rounded-lg border-orange-200 w-[79vw] md:w-[32rem] lg:w-[1rem] xl:w-[24rem] 2xl:w-[30rem] h-[2.5rem]"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="facebook" className="text-[.9rem] md:text-[1.2rem]">
            Facebook
          </label>
          <input
            type="text"
            id="facebook"
            name="facebook"
            placeholder="Facebook"
            className={`${inputStyle}`}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="instagram" className="text-[.9rem] md:text-[1.2rem]">
            Instagram
          </label>
          <input
            type="text"
            id="instagram"
            name="instagram"
            placeholder="Instagram"
            className={`${inputStyle}`}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="youtube" className="text-[.9rem] md:text-[1.2rem]">
            Youtube
          </label>
          <input
            type="text"
            id="youtube"
            name="youtube"
            placeholder="Youtube"
            className={`${inputStyle}`}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="twitter" className="text-[.9rem] md:text-[1.2rem]">
            Twitter
          </label>
          <input
            type="text"
            id="twitter"
            name="twitter"
            placeholder="Twitter"
            className={`${inputStyle}`}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="website" className="text-[.9rem] md:text-[1.2rem]">
            Sitio web
          </label>
          <input
            type="text"
            id="website"
            name="website"
            placeholder="Website"
            className={`${inputStyle}`}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="tiktok" className="text-[.9rem] md:text-[1.2rem]">
            Tiktok
          </label>
          <input
            type="text"
            id="tiktok"
            name="tiktok"
            placeholder="Tiktok"
            className={`${inputStyle}`}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <input
          ref={checkboxRef}
          type="checkbox"
          name="termsandcondition"
          id="termsandcondition"
          className=""
        />
        <label
          htmlFor="termsandcondition"
          className="text-[.9rem] md:text-[1.2rem]"
        >
          He leído y acepto los
          <Link href="/docs/terms.html">
            <span style={{ cursor: "pointer" }} className="text-orange-500">
              {" "}
              Términos y condiciones{" "}
            </span>
          </Link>
          y
          <Link href="/docs/privacypolicy.html">
            <span style={{ cursor: "pointer" }} className="text-orange-500">
              {" "}
              Política de privacidad{" "}
            </span>
          </Link>
          de
          <span className="text-orange-500"> Orange Publicity</span>
        </label>
      </div>

    </>
    // <div className="signuppage1holder">
    //   {/* heading text section */}
    //   <div className={styles2.toptext}>
    //     <div className={styles2.largetext}>
    //       <h2>
    //         ¡Estás a unos pasos de disfrutar de tu propio portafolio de
    //         productos y servicios!
    //       </h2>
    //     </div>
    //   </div>
    //   <div className={styles2.returndiv}>
    //     <Link href="/login/Signup">
    //       <button> <span className="secondary-color">🞀</span>Regresar</button>
    //     </Link>
    //   </div>
    //   {/* second part */}
    //   <div className={styles2.formimageholder}>
    //     {/* form container */}
    //     <form className={styles.formholder} ref={formRef} >
    //       <div className={styles.singleinput}>
    //         <label htmlFor="country">País *</label>
    //         <input type="text" id="country" name="country" placeholder="Escribe el país..." className={styles2.inputs} />
    //         {errorstate?.country ? (<p className={styles.error}>Por favor complete este campo</p>) : null}
    //       </div>
    //       <div className={`${styles.singleinput} ${styles.double}`}>
    //         <div className={styles.state}>
    //           <label htmlFor="stateprovince">Estado/Provincia *</label>
    //           <input type="text" id="stateprovince" name="stateprovince" placeholder="Estado / Provincia / Departamento..." className={styles2.inputs} />
    //           {errorstate?.state ? (<p className={styles.error}>Por favor complete este campo</p>) : null}
    //         </div>
    //         <div className={styles.city}>
    //           <label htmlFor="city">Ciudad *</label>
    //           <input type="text" id="city" name="city" placeholder="Escribe la ciudad..." className={styles2.inputs} />
    //           {errorstate?.city ? (<p className={styles.error}>Por favor complete este campo</p>) : null}
    //         </div>
    //       </div>
    //       <div className={styles.singleinput}>
    //         <label htmlFor="postalcode">Código postal *</label>
    //         <input type="number" id="postalcode" name="postalcode" placeholder="Escribe el Código postal..." className={styles2.inputs} />
    //         {errorstate?.postalcode ? (<p className={styles.error}>Por favor complete este campo</p>) : null}
    //       </div>

    //       <div className={styles.singleinput}>
    //         <label htmlFor="description">Descripción completa de la empresa *</label>
    //         <input type="text" id="description" name="description" placeholder="Escribe la descripción completa de tu empresa..." className={styles2.inputs} />
    //         {errorstate?.description ? (<p className={styles.error}>Por favor complete este campo</p>) : null}
    //       </div>
    //       <div className={styles.singleinput}>
    //         <label htmlFor="short">Reseña corta de la empresa *</label>
    //         <input type="text" id="short" name="short" placeholder="Escribe una reseña corta de tu empresa..." className={styles2.inputs} />
    //         {errorstate?.description ? (<p className={styles.error}>Por favor complete este campo</p>) : null}
    //       </div>

    //       <div className={`${styles.singleinput} ${styles.double}`}>
    //         <div className={styles.coverimage} >
    //           <label htmlFor="coverimage">Imagen de portada </label>
    //           <input type="file" id="coverimage" style={{ padding: ".2rem" }} name="coverImage" placeholder="State/Province" className={styles2.inputs} />
    //         </div>
    //         <div className={styles.logoimage} >
    //           <label htmlFor="logoimage">Logo de tu empresa</label>
    //           <input type="file" id="logoimage" style={{ padding: ".2rem" }} name="logoImage" placeholder="City" className={styles2.inputs} />
    //         </div>
    //       </div>

    //       <div className={`${styles.singleinput} ${styles.whatsapp}`}>
    //         <div className={styles.countrycode}>
    //           <input type="number" id="telephonecc" name="telephonecc" placeholder="+1" className={styles2.inputs} />
    //           {errorstate?.telephonecc ? (<p className={styles.error}>**</p>) : null}
    //         </div>
    //         <div className={styles.number}>
    //           <label htmlFor="telephonenum">Teléfono de contacto *</label>
    //           <input type="number" id="telephonenum" name="telephonenum" placeholder="Escribe tu número de teléfono..." className={styles2.inputs} />
    //           {errorstate?.telephonenum ? (<p className={styles.error}>Por favor complete este campo</p>) : null}
    //         </div>
    //       </div>
    //       <div className={`${styles.singleinput} ${styles.double}`}>
    //         <div className={styles.facebook}>
    //           <label htmlFor="facebook">Facebook </label>
    //           <input type="text" id="facebook" name="facebook" placeholder="Facebook" className={styles2.inputs} />
    //         </div>
    //         <div className={styles.instagram}>
    //           <label htmlFor="instagram">Instagram</label>
    //           <input type="text" id="instagram" name="instagram" placeholder="Instagram" className={styles2.inputs} />
    //         </div>
    //       </div>
    //       <div className={`${styles.singleinput} ${styles.double}`}>
    //         <div className={styles.facebook}>
    //           <label htmlFor="youtube">YouTube </label>
    //           <input type="text" id="youtube" name="youtube" placeholder="Youtube" className={styles2.inputs} />
    //         </div>
    //         <div className={styles.instagram}>
    //           <label htmlFor="twitter">Twitter</label>
    //           <input type="text" id="twitter" name="twitter" placeholder="Twitter" className={styles2.inputs} />
    //         </div>
    //       </div>
    //       <div className={`${styles.singleinput} ${styles.double}`}>
    //         <div className={styles.facebook}>
    //           <label htmlFor="website">Sitio web </label>
    //           <input type="text" id="website" name="website" placeholder="Ingresa tu sitio web" className={styles2.inputs} />
    //         </div>
    //         <div className={styles.instagram}>
    //           <label htmlFor="tiktok">TikTok</label>
    //           <input type="text" id="tiktok" name="tiktok" placeholder="TikTok" className={styles2.inputs} />
    //         </div>
    //       </div>
    //     </form>

    //     {/* image container */}

    //     <div className={styles.sliceimageholder}>
    //       <img src="/login/various_oranges.png" alt="orange" />

    //     </div>
    //   </div>
    // </div>
  );
};

export default Signup2;
