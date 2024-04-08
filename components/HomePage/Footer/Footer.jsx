import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaTiktok,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import axios from "@/app/api/customerAxiosInterceptor";

const Footer = () => {
  const [orange, setorange] = useState({});

  const getOrange = async (req, res) => {
    try {
      const resp = await axios.get("getorange");
      setorange(resp.data[0]);
    } catch (error) {
      console.log(`error: ${error}`);
    }
  };
  useEffect(() => {
    getOrange();
  }, []);
  return (
    <div className="flex flex-col items-center py-8 lg:py-16">
      <div className="flex flex-col items-center text-slate-500 py-8 w-[90vw] lg:w-[80vw] border-t-[1px] border-b-[1px] border-slate-400">
        <p className="mb-4">
          &copy; 2024 Orange Publicity. All rights reserved.
        </p>
        <div className="flex flex-col lg:flex-row lg:justify-between w-full lg:w-auto">
          <p className="cursor-pointer mb-2 lg:mb-0 hover:text-slate-700">
            Privacy Policy
          </p>
          <p className="cursor-pointer hover:text-slate-700">
            Terms and Conditions
          </p>
        </div>
      </div>
      <div className="w-[90vw] lg:w-[80vw] mt-8 lg:mt-10 flex flex-col lg:flex-row justify-between items-center">
        <div className="mb-4 lg:mb-0">
          <Image  
onError={(e) => {
                        e.target.src = "/fallbackimage.png"; // Provide the URL of your fallback image
                      }}
            src="/logo.png"
            alt="logo"
            height={80}
            width={80}
            className="ml-2 lg:ml-0"
          />
        </div>
        <div className="flex gap-4 flex-wrap lg:gap-8">
          {orange?.facebook ? (
            <div className="border-[1px]  border-slate-500 rounded-full p-4 h-fit cursor-pointer transition-all ease-in-out duration-200 hover:text-orange-500 hover:border-orange-500 hover:scale-105 ">
              <a href={orange?.facebook} target="_blank">
                <FaFacebookF className="text-xl " />
              </a>
            </div>
          ) : null}

          {orange?.instagram ? (
            <div className="border-[1px] border-slate-500 rounded-full p-4 h-fit cursor-pointer transition-all ease-in-out duration-200 hover:text-orange-500 hover:border-orange-500 hover:scale-105">
              <a href={orange?.instagram} target="_blank">
                <FaInstagram className="text-xl " />
              </a>
            </div>
          ) : null}
          {orange?.twitter ? (
            <div className="border-[1px] border-slate-500 rounded-full p-4 h-fit cursor-pointer transition-all ease-in-out duration-200 hover:text-orange-500 hover:border-orange-500 hover:scale-105">
              <a href={orange?.twitter} target="_blank">
                <FaXTwitter className="text-xl " />
              </a>
            </div>
          ) : null}
          {orange?.whatsapp ? (
            <div className="border-[1px] border-slate-500 rounded-full p-4 h-fit cursor-pointer transition-all ease-in-out duration-200 hover:text-orange-500 hover:border-orange-500 hover:scale-105">
              <a
                href={`https://wa.me/${orange?.whatsapp}?text=Hello Orange`}
                target="_blank"
              >
                <FaWhatsapp className="text-xl " />
              </a>
            </div>
          ) : null}
          {orange?.youtube ? (
            <div className="border-[1px] border-slate-500 rounded-full p-4 h-fit cursor-pointer transition-all ease-in-out duration-200 hover:text-orange-500 hover:border-orange-500 hover:scale-105">
              <a href={orange?.youtube} target="_blank">
                <FaYoutube className="text-xl " />
              </a>
            </div>
          ) : null}
          {orange?.tiktok ? (
            <div className="border-[1px] border-slate-500 rounded-full p-4 h-fit cursor-pointer transition-all ease-in-out duration-200 hover:text-orange-500 hover:border-orange-500 hover:scale-105">
              <a href={orange?.tiktok} target="_blank">
                <FaTiktok className="text-xl " />
              </a>
            </div>
          ) : null}
          {orange?.email ? (
            <div className="border-[1px] border-slate-500 rounded-full p-4 h-fit cursor-pointer transition-all ease-in-out duration-200 hover:text-orange-500 hover:border-orange-500 hover:scale-105">
              <a href={`mailto:${orange?.email}`} target="_blank">
                <BiLogoGmail className="text-xl " />
              </a>
            </div>
          ) : null}
          {orange?.address ? (
            <div className="border-[1px] border-slate-500 rounded-full p-4 h-fit cursor-pointer transition-all ease-in-out duration-200 hover:text-orange-500 hover:border-orange-500 hover:scale-105">
              <a
                href={`https://www.google.com/maps/search/?q=${orange?.address}`}
                target="_blank"
              >
                <FaMapMarkedAlt className="text-xl " />
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Footer;
