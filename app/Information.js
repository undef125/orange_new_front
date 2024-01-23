import React, { useContext } from "react";
import { IndexContext } from "../context";
import styles from "../styles/Signup.module.css";
import BackBtnPop from "../components/BackBtnPop";

const Information = () => {
  const { informationData, setInformationData } = useContext(IndexContext);

  const onDataChange = (e, selectcheck) => {
    if (selectcheck === "select") {
      setInformationData({
        ...informationData,

        meansname: e.target.options[e.target.selectedIndex].text,
      });
    } else {
      setInformationData({
        ...informationData,

        [e.target.name]: e.target.value,
      });
    }
  };

  const signupFields = [
    {
      label: "Tu nombre*",
      placeholder: "Escribe tu nombre...",
      type: "text",
      name: "name",
      width: "100%",
      value: informationData?.name,
    },
    {
      name: "email",
      label: "E-mail*",
      placeholder: "Escribe tu E-mail...",
      type: "email",
      width: "100%",
      value: informationData?.email,
    },
    {
      name: "businessname",
      label: "¿Cuál es el nombre de tu negocio o empresa?",
      placeholder: "Escribe aquí el nombre de tu negocio o empresa",
      type: "text",
      width: "100%",
      value: informationData?.businessname,
    },
    {
      name: "productname",
      label: "¿Qué tipo de negocio tienes?",
      placeholder: "Escribe aquí la actividad principal de tu negocio",
      type: "text",
      width: "100%",
      value: informationData?.productname,
    },
    {
      name: "meansname",
      label: "¿Qué medios estás utilizando para ofrecer tu negocio?",
      placeholder: "select an option",
      type: "select",
      width: "100%",
      value: informationData?.meansname,
    },
  ];

  return (
    <section
      className={` section-margin-bottom ${styles.mainContainer} ${styles.infoContainer}`}
    >
      <BackBtnPop />
      <div className={styles.uppercontainer}>
        <div className={styles.container}>
          <div className={styles.infoImageContainer}>
            <img src="/logo.png" alt="orange" />
          </div>
        </div>
        <div className={styles.headingtextinfo}>
          <h2 className={styles.infoHeader}>
            !Estamos listos para ayudarte a crear tu portafolio en Orange
            Publicity¡
          </h2>
        </div>
      </div>
      <div className={styles.formContainer}>
        <div className={styles.form2}>
          {signupFields.map((data, index) => (
            <div key={index}>
              <label htmlFor={data.name}>{data.label}</label>
              {data.type === "select" ? (
                <select
                  className={styles.inputselect}
                  placeholder={data.placeholder}
                  defaultValue={data.placeholder}
                  name={data.name}
                  id={data.name}
                  onChange={(e) => onDataChange(e, "select")}
                >
                  <option value="socialmedia" className={styles.options}>
                    - Instagram, Facebook, WhatsApp, Página web, otra red social
                  </option>
                  <option value="physical" className={styles.options}>
                    - Tienda física
                  </option>
                  <option value="nobusiness" className={styles.options}>
                    {"- Aun no tengo negocio"}
                  </option>
                </select>
              ) : (
                <input
                  className={styles.inputs}
                  type={data.type}
                  placeholder={data.placeholder}
                  style={{ width: "100%" }}
                  id={data.name}
                  name={data.name}
                  value={data.value}
                  onChange={onDataChange}
                />
              )}
            </div>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={() => {
              window.location.href = `mailto:info@orangepublicity.com?subject=information&body=${`
                  name: ${informationData.name}\n
                  email: ${informationData.email}\n
                  businessname: ${informationData.businessname}\n
                  productname: ${informationData.productname}\n
                  meansname: ${informationData.meansname}
                `}`;
            }}
          >
            Enviar
          </button>
        </div>
      </div>
    </section>
  );
};

export default Information;
