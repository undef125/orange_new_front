import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TbEdit } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";
import toBase64 from "@/utilis/FileToBase64";
import axios from "@/app/api/axiosinterceptor";
import { toast } from "react-hot-toast";

const ColorDisplay = ({
  name,
  code,
  color,
  isLast,
  onUpdateColor,
  onCancel,
}) => {
  const [editing, setEditing] = useState(false);
  const [newCode, setNewCode] = useState(code);

  const handleUpdate = () => {
    onUpdateColor(name, newCode);
    setEditing(false);
  };

  const handleCancel = () => {
    setNewCode(code);
    setEditing(false);
    onCancel();
  };

  return (
    <div className=" items-center mb-4 grid grid-cols-2 bg-slate-100 p-[1rem] rounded">
      <div className="mr-2">{name}: </div>
      {!editing ? (
        <div className="grid grid-cols-3 ">
          <div className="mr-2">{code}</div>
          <div
            className={`w-8 h-8 ${
              isLast ? "border-black border-2" : "border-black border-2"
            }`}
            style={{ backgroundColor: color }}
          ></div>
          <button
            className="ml-4 border border-gray-400 px-2 py-1 rounded"
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-4">
          <input
            type="text"
            value={newCode}
            onChange={(e) => setNewCode(e.target.value)}
            className="mr-2 border border-gray-400 px-2 py-1 rounded"
          />
          <div
            className={`w-8 h-8 ${isLast ? "border-black border-4" : ""}`}
            style={{ backgroundColor: newCode }}
          ></div>
          <button
            className="ml-4 border border-green-400 px-2 py-1 rounded"
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            className="ml-2 border border-red-400 px-2 py-1 rounded"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

const CustomizePage = ({ company, getUserAndComapnyDetail }) => {
  const [editLogo, seteditLogo] = useState(false);
  const [editCover, seteditCover] = useState(false);
  const [updateValues, setupdateValues] = useState({});
  const [changesLogo, setchangesLogo] = useState(false);
  const [changesCover, setchangesCover] = useState(false);
  const [backup, setbackup] = useState([]);
  const [colors, setColors] = useState();

  const updateCompanyImage = async () => {
    const toastId = toast.loading("Updating Image...");
    try {
      await axios.put(`updatecompanyimage/${company?._id}`, updateValues);
      toast.dismiss(toastId);
      setchangesCover(false);
      setchangesLogo(false);
      setupdateValues({});
      getUserAndComapnyDetail();
      toast.success("Image Updated Successfully!");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Image Updation Failed");
    }
  };
  const handleUpdateColor = async (name, newCode) => {
    // onUpdateColor(name, newCode);
    const toastId = toast.loading("Updating color...");
    try {
      await axios.post(`/updatecolors/${company?._id}`, {
        [`${name}`]: newCode,
      });
      getColorMethod(company?._id);
      //aako data update bhayesi color get garne api feri call gar
      toast.dismiss(toastId);
      toast.success("Color Updated Successfully!");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Color Updation Failed");
    }
  };

  const resetColors = async () => {
    const toastId = toast.loading("Reseting colors...");
    toast.dismiss(toastId);
    try {
      await axios.get(`/resetcolorstodefault/${company?._id}`);
      toast.success("Color Reseted Successfully!");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Resetting Colors Failed");
    }
  };

  const getColorMethod = async (companyId) => {
    try {
      const resp3 = await axios.get(`/getcolors/${companyId}`);
      setColors(resp3.data[0]);
    } catch (error) {}
  };
  useEffect(() => {
    setbackup(company);
    getColorMethod(company?._id);
  }, [company]);

  return (
    <div>
      <h1 className="text-orange-500 font-semibold text-[1.5rem] md:text-[2.5rem] text-center my-2 ">
        Customize your store
      </h1>
      <div className="mb-[1rem]">
        {changesLogo || changesCover ? (
          <div className="mt-10 flex justify-center gap-2">
            <button
              className="rounded-xl py-1 px-2 md:px-6 md:py-3 bg-orange-500 text-[1.2rem] font-semibold "
              onClick={updateCompanyImage}
            >
              Update
            </button>
            <button
              className="rounded-xl py-1 px-2 md:px-6 md:py-3 bg-orange-500 text-[1.2rem] font-semibold "
              onClick={() => {
                setchangesCover(false);
                setchangesLogo(false);
                setupdateValues({});
              }}
            >
              Cancel Changes
            </button>
          </div>
        ) : null}
      </div>
      <div>
        <div className=" flex justify-center ">
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
                        changesLogo
                          ? updateValues?.logoImage
                          : company?.logoImage
                      }
                      height={300}
                      width={300}
                      className="shadow shadow-slate-500 h-[40vh] object-cover"
                      alt={`logo of ${company?.companyName}`}
                      onError={(e) => {
                        e.target.src = "/fallbackimage.png"; // Provide the URL of your fallback image
                      }}
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
onError={(e) => {
                        e.target.src = "/fallbackimage.png"; // Provide the URL of your fallback image
                      }}
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
        </div>
        <div className="h-[4rem] mt-[1rem]">
          <h1 className="text-orange-500 font-semibold text-[1.5rem] md:text-[2.5rem] text-center my-2 ">
            Store Color Customization
          </h1>
          <div className="h-[55vh] ">
            <div className="grid grid-cols-2 gap-4 w-[95%] m-auto">
              {colors
                ? Object.entries(colors).map(([name, code], index) =>
                    name.includes("_id") ||
                    name.includes("__v") ||
                    name.includes("companyId") ? null : (
                      <ColorDisplay
                        key={name}
                        name={
                          name == "base"
                            ? " Base Color"
                            : name == "searchBar"
                            ? // ? "Store Color"
                              // : name == "storeColor"
                              "Search Bar Color"
                            : name === "cartBg"
                            ? "Cart Background"
                            : name == "shortReview"
                            ? "Short Review Text Color"
                            : name == "description"
                            ? "Description Text Color"
                            : name === "shopNowBtnColor"
                            ? "Shop Now Button Color"
                            : name === "shopNowBtnTextColor"
                            ? "Shop Now Button Text Color"
                            : ""
                        }
                        code={code}
                        color={code}
                        isLast={index === Object.keys(colors).length - 1}
                        onUpdateColor={handleUpdateColor}
                        onCancel={() => {}}
                      />
                    )
                  )
                : null}
            </div>
            <div className="flex justify-center items-center ">
              <button
                onClick={() => {
                  resetColors();
                }}
                className="bg-orange-500 font-semibold text-white px-8 py-2 rounded text-[1.1rem] border-[2px] transition-all duration-300 ease-in-out hover:bg-white hover:border-[2px] hover:border-orange-500 hover:text-black "
              >
                reset all colors to default
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizePage;
