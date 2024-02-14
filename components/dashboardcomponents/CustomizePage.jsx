import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TbEdit } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";
import toBase64 from "@/utilis/FileToBase64";
import axios from "@/app/api/axiosinterceptor";
import { toast } from "react-hot-toast";

const CustomizePage = ({ company }) => {
  const [editLogo, seteditLogo] = useState(false);
  const [editCover, seteditCover] = useState(false);
  const [updateValues, setupdateValues] = useState({});
  const [changesLogo, setchangesLogo] = useState(false);
  const [changesCover, setchangesCover] = useState(false);
  const [backup, setbackup] = useState([]);

  const updateCompanyImage = async () => {
    const toastId = toast.loading("Updating Image...");
    try {
      await axios.put(`updatecompanyimage/${company?._id}`, updateValues);
      toast.dismiss(toastId);
      toast.success("Image Updated Successfully!");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Image Updation Failed");
    }
  };

  useEffect(() => {
    setbackup(company);
  }, [company]);

  return (
    <div>
      <h1 className="text-orange-500 font-semibold text-[1.5rem] md:text-[2.5rem] text-center my-2 ">
        Customize your store
      </h1>
      {changesLogo || changesCover ? (
        <div className="mt-10 flex justify-center gap-2">
          <button
            className="rounded-xl py-1 px-2 md:px-6 md:py-3 bg-orange-500 text-[1.2rem] font-semibold "
            onClick={updateCompanyImage}
          >
            UPDATE BUTTON
          </button>
          <button
            className="rounded-xl py-1 px-2 md:px-6 md:py-3 bg-orange-500 text-[1.2rem] font-semibold "
            onClick={() => {
              setchangesMade(false);
              seteditImage(false);
              setupdateValues({});
            }}
          >
            Cancel Changes
          </button>
        </div>
      ) : null}
      <div className="h-[40vh] flex justify-center ">
        <div className="flex flex-col md:flex-row justify-center  gap-6 border-[1px] p-4 w-[95vw] h-fit shadow-sm shadow-orange-400">
          <div className="w-fit ">
            <h1 className="font-semibold text-[1.2rem] my-3 text-slate-500">
              Logo Image
            </h1>
            <div className="relative group">
              {!editLogo ? (
                <>
                  <Image
                    src={
                      changesLogo ? updateValues?.logoImage : company?.logoImage
                    }
                    height={300}
                    width={300}
                    className="shadow shadow-slate-500 h-[40vh] object-cover "
                    alt={`logo of ${company?.companyName}`}
                  />
                  <div className="absolute hidden group-hover:flex group-hover:top-0 justify-center items-center h-[100%] w-[100%] bg-[#f8f8f8d6] ">
                    <TbEdit
                      className="text-[2.3rem] hover:text-orange-500 cursor-pointer "
                      onClick={() => {
                        seteditLogo(true);
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-green-100 cursor-pointer rounded-xl my-auto h-[40vh] w-[300px] flex justify-center items-center">
                    <input
                      type="file"
                      id="fileInput"
                      style={{ display: "none" }}
                      onChange={async (e) => {
                        setupdateValues({
                          ...updateValues,
                          logoImage: await toBase64(e.target.files[0]),
                        });
                        seteditLogo(false);
                        setchangesLogo(true);
                      }}
                    />
                    <label
                      htmlFor="fileInput"
                      className="cursor-pointer h-[100%] w-[100%] flex items-center justify-center"
                    >
                      <IoMdAdd className="text-[2rem] " />
                    </label>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="w-fit ">
            <h1 className="font-semibold text-[1.2rem] my-3 text-slate-500">
              {" "}
              Banner Image
            </h1>
            <div className="relative group">
              {!editCover ? (
                <>
                  <Image
                    src={
                      changesCover
                        ? updateValues?.coverImage
                        : company?.coverImage
                    }
                    height={300}
                    width={300}
                    className="shadow shadow-slate-500 h-[40vh] md:w-[60vw] object-cover "
                    alt={`logo of ${company?.companyName}`}
                  />
                  <div className="absolute hidden group-hover:flex group-hover:top-0 justify-center items-center h-[100%] w-[100%] bg-[#f8f8f8d6] ">
                    <TbEdit
                      className="text-[2.3rem] hover:text-orange-500 cursor-pointer "
                      onClick={() => {
                        seteditCover(true);
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-green-100 cursor-pointer rounded-xl my-auto h-[40vh] w-[300px] flex justify-center items-center">
                    <input
                      type="file"
                      id="fileInput"
                      style={{ display: "none" }}
                      onChange={async (e) => {
                        setupdateValues({
                          ...updateValues,
                          coverImage: await toBase64(e.target.files[0]),
                        });
                        seteditCover(false);
                        setchangesCover(true);
                      }}
                    />
                    <label
                      htmlFor="fileInput"
                      className="cursor-pointer h-[100%] w-[100%] flex items-center justify-center"
                    >
                      <IoMdAdd className="text-[2rem] " />
                    </label>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* <div className="w-fit ">
          <h1></h1>
          <div className="relative group">
            {!editCover ? (
              <>
                <Image
                  src={changesCover ? updateValues?.coverImage : company?.coverImage }
                  height={300}
                  width={300}
                  className="shadow shadow-slate-500 w-[60vw] h-[40vh] object-cover "
                  alt={`logo of ${company?.companyName}`}
                />
                <div className="absolute hidden group-hover:flex group-hover:top-0 justify-center items-center h-[100%] w-[100%] bg-[#f8f8f8d6] ">
                  <TbEdit
                    className="text-[2.3rem] hover:text-orange-500 cursor-pointer "
                    onClick={() => {
                      seteditCover(true)
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="bg-green-100 cursor-pointer rounded-xl my-auto h-[40vh] w-[300px] flex justify-center items-center">
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={async (e) => {
                      setupdateValues({
                        ...updateValues,
                        coverImage: await toBase64(e.target.files[0]),
                      });
                      seteditLogo(false)
                      setchangesCover(true);
                    }}
                  />
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer h-[100%] w-[100%] flex items-center justify-center"
                  >
                    <IoMdAdd className="text-[2rem] " />
                  </label>
                </div>
              </>
            )}
          </div>
        </div> */}

        {/* <div className="w-[40vw] bg-slate-300"></div> */}
      </div>
    </div>
  );
};

export default CustomizePage;
