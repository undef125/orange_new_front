import React from "react";
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

const StoreFooter = ({ company }) => {
  const iconComp = {
    facebook: () => {
      return <FaFacebookF className="text-xl " />;
    },
    instagram: () => {
      return <FaInstagram className="text-xl " />;
    },
    tiktok: () => {
      return <FaTiktok className="text-xl " />;
    },
    youtube: () => {
      return <FaYoutube className="text-xl " />;
    },
    website: () => {
      return <FaMapMarkedAlt className="text-xl " />;
    },
    twitter: () => {
      return <FaXTwitter className="text-xl " />;
    },
  };
  return (
    <div className="flex flex-col items-center py-8 lg:py-16">
      <div className="flex flex-col items-center text-slate-500 py-8 w-[95vw] lg:w-[95vw] border-t-[1px] border-b-[1px] border-slate-400">
        <p className="mb-4">
          &copy; 2024 {company?.companyName}. All rights reserved.
        </p>
        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between w-full lg:w-auto">
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
            src={company?.logoImage}
            alt="logo"
            height={80}
            width={80}
            className="ml-2 lg:ml-0 rounded-full"
          />
        </div>
        <div className="flex gap-4 flex-wrap lg:gap-8">
          {company?.socialMedias
            ? Object.keys(company?.socialMedias).map((smedia) => {
                return (
                  <div className="border-[1px]  border-slate-500 rounded-full p-4 h-fit cursor-pointer transition-all ease-in-out duration-200 hover:text-orange-500 hover:border-orange-500 hover:scale-105 ">
                    <a
                      href={`${company?.socialMedias[smedia]}`}
                      target="_blank"
                    >
                      {iconComp[`${smedia}`]()}
                    </a>
                  </div>
                );
              })
            : null}

          <div className="border-[1px] border-slate-500 rounded-full p-4 h-fit cursor-pointer transition-all ease-in-out duration-200 hover:text-orange-500 hover:border-orange-500 hover:scale-105">
            <a href={`https://wa.me/${company?.phone}?text=Hello my friend`} target="_blank">
              <FaWhatsapp className="text-xl " />
            </a>
          </div>

          <div className="border-[1px] border-slate-500 rounded-full p-4 h-fit cursor-pointer transition-all ease-in-out duration-200 hover:text-orange-500 hover:border-orange-500 hover:scale-105">
            <a href={`mailto:${company?.email}`} target="_blank">
              <BiLogoGmail className="text-xl " />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreFooter;
