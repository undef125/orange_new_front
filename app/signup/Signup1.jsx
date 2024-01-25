import React from "react";
import Link from "next/link";

const Signup1 = ({ values, handleBlur, handleChange,errors,passwordShow,setFieldValue }) => {
  const lgIpWidth = 36;
  const inputStyle = `focus:border-orange-500 focus:outline-none px-2 text-[.9rem] md:text-[1.2rem]  border-2 rounded-lg  border-orange-200 w-[95vw] md:w-[40rem] lg:w-[${lgIpWidth}rem] h-[2.5rem]`;

  return (
    <div className=" flex flex-col w-[95vw] md:w-[36rem] gap-y-2 md:gap-y-3 m-auto">
      <div className="flex gap-[1vw] sm:gap-[1vw] md:gap-[1rem]">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-[.9rem] md:text-[1.2rem]">
            Nombre *{" "}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Escribe tu nombre..."
            className={`focus:border-orange-500 focus:outline-none px-[1vw] text-[.9rem] md:text-[1.2rem] border-2 rounded-lg w-[47vw] sm:w-[47vw] border-orange-200 ${errors.name ? 'border-red-500 shadow-sm shadow-red-500': ''} md:w-[19.5rem] lg:w-[17.5rem] lg:[${
              (lgIpWidth - 1) / 2
            }rem] h-[2.5rem]`}
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {/* {errors.name ? <div className="text-red-500">{errors.name}</div> : ""} */}
        </div>
        <div className="flex flex-col">
          <label htmlFor="surname" className="text-[.9rem] md:text-[1.2rem]">
            Apellidos
          </label>
          <input
            type="text"
            id="surname"
            name="surname"
            placeholder="Escribe tus apellidos..."
            className={`focus:border-orange-500 focus:outline-none px-2 text-[.9rem] md:text-[1.2rem]  border-2 rounded-lg w-[47vw] sm:w-[47vw] border-orange-200 ${errors.surname ? 'border-red-500 shadow-sm shadow-red-500': ''}  md:w-[19.5rem] lg:w-[17.5rem] lg:[${
              (lgIpWidth - 1) / 2
            }rem] h-[2.5rem]`}
            value={values.surname}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {/* {errors.surname ? (
            <div className="text-red-500">{errors.surname}</div>
          ) : (
            ""
          )} */}
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-[.9rem] md:text-[1.2rem]">
          E-mail *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Escribe tu E-mail..."
          className={`${inputStyle} ${errors.email ? 'border-red-500 shadow-sm shadow-red-500': ''} `}
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {/* {errors.email ? <div className="text-red-500">{errors.email}</div> : ""} */}
      </div>
      <div className="flex flex-col">
        <label htmlFor="username" className="text-[.9rem] md:text-[1.2rem]">
          Usuario *
        </label>
        <input
          type="text"
          id="username"
          name="userName"
          placeholder="Escribe tu nombre de usuario..."
          className={`${inputStyle} ${errors.userName ? 'border-red-500 shadow-sm shadow-red-500': ''} `}
          value={values.userName}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {/* {errors.userName ? (
          <div className="text-red-500">{errors.userName}</div>
        ) : (
          ""
        )} */}
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="text-[.9rem] md:text-[1.2rem]">
          Contraseña *
        </label>
        <input
          type={passwordShow ? "text" : "password"}
          id="password"
          name="password"
          placeholder="Escribe tu contraseña..."
          className={`${inputStyle} ${errors.password ? 'border-red-500 shadow-sm shadow-red-500': ''} `}
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {/* {errors.password ? (
          <div className="text-red-500">{errors.password}</div>
        ) : (
          ""
        )} */}
      </div>
      <div className="flex flex-col">
        <label htmlFor="businessname" className="text-[.9rem] md:text-[1.2rem]">
          Nombre del negocio{" "}
          <span style={{ color: "red" }}>
            (Este nombre nunca podrá ser modificado)
          </span>{" "}
          *
        </label>
        <input
          type="text"
          id="businessname"
          name="businessName"
          placeholder="Escribe el nombre de tu negocio..."
          className={`${inputStyle} ${errors.businessName ? 'border-red-500 shadow-sm shadow-red-500': ''} `}
          value={values.businessName}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {/* {errors.businessName ? (
          <div className="text-red-500">{errors.businessName}</div>
        ) : (
          ""
        )} */}
      </div>
      <div className="flex flex-col md:w-[40rem]">
        <div>
          <label
            htmlFor="whatsappnum"
            className="text-[.9rem] md:text-[1.2rem]"
          >
            WhatsApp del negocio *
          </label>
          <div className="flex gap-[1vw] md:gap-[1rem]">
            <div>
              <input
                type="number"
                id="whatsappcc"
                name="whatsappcc"
                placeholder="+1"
                className={`${errors.name ? 'border-red-500 shadow-sm shadow-red-500': ''}  focus:border-orange-500 focus:outline-none px-2 text-[.9rem] md:text-[1.2rem]  border-2 rounded-lg border-orange-200 w-[15vw] md:w-[5rem] lg:w-[5rem] h-[2.5rem]`}
                value={values.whatsappcc}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="number"
                id="whatsappnum"
                name="whatsappnum"
                placeholder="Escribe el WhatsApp del negocio..."
                 className={`${errors.name ? 'border-red-500 shadow-sm shadow-red-500': ''}  focus:border-orange-500 focus:outline-none px-2 text-[.9rem] md:text-[1.2rem]  border-2 rounded-lg border-orange-200 w-[79vw] md:w-[34rem] lg:w-[30rem] h-[2.5rem]`}
                value={values.whatsappnum}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {/* {errors.whatsappcc ? (
                <div className="text-red-500">{errors.whatsappcc}</div>
              ) : (
                ""
              )}
              {errors.whatsappnum ? (
                <div className="text-red-500">{errors.whatsappnum}</div>
              ) : (
                ""
              )} */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <input
          type="checkbox"
          name="isAgreed"
          id="termsandcondition"
          checked={values.isAgreed}
          onBlur={handleBlur}
          // onChange={handleChange}
          onChange={(e) => {
            setFieldValue("isAgreed", e.target.checked);
          }}
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
      {errors.isAgreed ? (
        <div className="text-red-500">{errors.isAgreed}</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Signup1;
