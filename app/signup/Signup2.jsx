import Link from "next/link";
import React, { useContext, useRef, useState } from "react";
import { IndexContext } from "../../context";
import axios from "../api/axiosinterceptor";
import Router from "next/router";
import { toast } from "react-toastify";
import toBase64 from "@/utilis/FileToBase64";

const Signup2 = ({
  values,
  handleBlur,
  handleChange,
  errors,
  passwordShow,
  setFieldValue,
}) => {
  const toastId = useRef(null);
  const inputStyle =
    "focus:border-orange-500 focus:outline-none px-2 text-[.9rem] md:text-[1.2rem]  border-2 rounded-lg border-orange-200 w-[95vw] md:w-[38rem] lg:w-[24rem] xl:w-[30rem] 2xl:w-[36rem] h-[2.5rem]";

  return (
    <>
      {/* {console.log(values)} */}
      <div className=" flex flex-wrap gap-y-2 lg:gap-y-4 lg:grid lg:grid-cols-2 ">
        <div className="flex flex-col">
          <label htmlFor="country" className="text-[.9rem] md:text-[1.2rem]">
            País *
          </label>
          <input
            type="text"
            id="country"
            name="country"
            placeholder="Escribe el país..."
            value={values.country}
            onBlur={handleBlur}
            onChange={handleChange}
            className={`${inputStyle} ${
              errors.country ? "border-red-500 shadow-sm shadow-red-500" : ""
            } `}
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
            value={values.postalcode}
            onBlur={handleBlur}
            onChange={handleChange}
            className={`${inputStyle} ${
              errors.postalcode ? "border-red-500 shadow-sm shadow-red-500" : ""
            }`}
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
              value={values.stateprovince}
              onBlur={handleBlur}
              onChange={handleChange}
              className={`${
                errors.stateprovince
                  ? "border-red-500 shadow-sm shadow-red-500"
                  : ""
              } focus:border-orange-500 focus:outline-none px-2 text-[.9rem] md:text-[1.2rem]  border-2 rounded-lg border-orange-200 w-[47vw] md:w-[18.5rem] lg:w-[11.5rem] xl:w-[14.5rem] 2xl:w-[17.5rem] h-[2.5rem]`}
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
              value={values.city}
              onBlur={handleBlur}
              onChange={handleChange}
              className={`${
                errors.city ? "border-red-500 shadow-sm shadow-red-500" : ""
              } focus:border-orange-500 focus:outline-none px-2 text-[.9rem] md:text-[1.2rem]  border-2 rounded-lg border-orange-200 w-[47vw] md:w-[18.5rem] lg:w-[11.5rem] xl:w-[14.5rem] 2xl:w-[17.5rem] h-[2.5rem]`}
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
            value={values.description}
            onBlur={handleBlur}
            onChange={handleChange}
            className={`${inputStyle} ${
              errors.description
                ? "border-red-500 shadow-sm shadow-red-500"
                : ""
            }`}
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
            value={values.short}
            onBlur={handleBlur}
            onChange={handleChange}
            className={`${inputStyle} ${
              errors.short ? "border-red-500 shadow-sm shadow-red-500" : ""
            }`}
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
                onChange={async (e) => {
                  setFieldValue(
                    "coverImage",
                    await toBase64(e.target.files[0])
                  );
                }}
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
                // value={values.logoImage}
                onBlur={handleBlur}
                onChange={async (e) => {
                  setFieldValue("logoImage", await toBase64(e.target.files[0]));
                }}
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
                value={values.telephonecc}
                onBlur={handleBlur}
                onChange={handleChange}
                className={`${
                  errors.short ? "border-red-500 shadow-sm shadow-red-500" : ""
                } focus:border-orange-500 focus:outline-none px-2 text-[.9rem] md:text-[1.2rem]  border-2 rounded-lg border-orange-200 w-[15vw] md:w-[5rem]  lg:w-[4rem] xl:w-[5rem] 2xl:w-[5rem] h-[2.5rem]`}
              />
              {/* lg:w-[24rem] xl:w-[30rem] 2xl:w-[36rem] */}
              <input
                type="number"
                id="telephonenum"
                name="telephonenum"
                placeholder="Escribe tu número de teléfono..."
                value={values.telephonenum}
                onBlur={handleBlur}
                onChange={handleChange}
                className={`${
                  errors.short ? "border-red-500 shadow-sm shadow-red-500" : ""
                } focus:border-orange-500 focus:outline-none px-2 text-[.9rem] md:text-[1.2rem]  border-2 rounded-lg border-orange-200 w-[79vw] md:w-[32rem] lg:w-[1rem] xl:w-[24rem] 2xl:w-[30rem] h-[2.5rem]`}
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
            value={values.facebook}
            onBlur={handleBlur}
            onChange={handleChange}
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
            value={values.instagram}
            onBlur={handleBlur}
            onChange={handleChange}
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
            value={values.youtube}
            onBlur={handleBlur}
            onChange={handleChange}
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
            value={values.twitter}
            onBlur={handleBlur}
            onChange={handleChange}
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
            value={values.website}
            onBlur={handleBlur}
            onChange={handleChange}
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
            value={values.tiktok}
            onBlur={handleBlur}
            onChange={handleChange}
            className={`${inputStyle}`}
          />
        </div>
      </div>
      <div className="flex gap-2 mt-5">
        <input
          type="checkbox"
          name="termsandcondition"
          id="termsandcondition"
          checked={values.isAgreed}
          onBlur={handleBlur}
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
    </>
  );
};

export default Signup2;
