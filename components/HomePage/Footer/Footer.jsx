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

const Footer = () => {
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
            src="/logo.png"
            alt="logo"
            height={80}
            width={80}
            className="ml-2 lg:ml-0"
          />
        </div>
        <div className="flex gap-4 flex-wrap lg:gap-8">
          <div className="border-[1px]  border-slate-500 rounded-full p-4 h-fit cursor-pointer transition-all ease-in-out duration-200 hover:text-orange-500 hover:border-orange-500 hover:scale-105 ">
            <a href="https://youtube.com" target="_blank">
              <FaFacebookF className="text-xl " />
            </a>
          </div>
          <div className="border-[1px] border-slate-500 rounded-full p-4 h-fit cursor-pointer transition-all ease-in-out duration-200 hover:text-orange-500 hover:border-orange-500 hover:scale-105">
            <FaInstagram className="text-xl " />
          </div>
          <div className="border-[1px] border-slate-500 rounded-full p-4 h-fit cursor-pointer transition-all ease-in-out duration-200 hover:text-orange-500 hover:border-orange-500 hover:scale-105">
            <FaXTwitter className="text-xl " />
          </div>
          <div className="border-[1px] border-slate-500 rounded-full p-4 h-fit cursor-pointer transition-all ease-in-out duration-200 hover:text-orange-500 hover:border-orange-500 hover:scale-105">
            <FaWhatsapp className="text-xl " />
          </div>
          <div className="border-[1px] border-slate-500 rounded-full p-4 h-fit cursor-pointer transition-all ease-in-out duration-200 hover:text-orange-500 hover:border-orange-500 hover:scale-105">
            <FaYoutube className="text-xl " />
          </div>
          <div className="border-[1px] border-slate-500 rounded-full p-4 h-fit cursor-pointer transition-all ease-in-out duration-200 hover:text-orange-500 hover:border-orange-500 hover:scale-105">
            <FaTiktok className="text-xl " />
          </div>
          <div className="border-[1px] border-slate-500 rounded-full p-4 h-fit cursor-pointer transition-all ease-in-out duration-200 hover:text-orange-500 hover:border-orange-500 hover:scale-105">
            <BiLogoGmail className="text-xl " />
          </div>
          <div className="border-[1px] border-slate-500 rounded-full p-4 h-fit cursor-pointer transition-all ease-in-out duration-200 hover:text-orange-500 hover:border-orange-500 hover:scale-105">
            <FaMapMarkedAlt className="text-xl " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
