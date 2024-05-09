import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "@/app/api/axiosinterceptor";

const ColorCustomization = ({company, colors, getColorMethod}) => {

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
        console.log(error)
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

  return (
    <div className="h-[4rem] mt-[1rem]">
      <h1 className="text-orange-500 font-semibold text-[1.5rem] md:text-[2.5rem] text-center my-2 ">
        Store Color Customization
      </h1>
      <div className="h-[55vh] ">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-[95%] m-auto">
          {colors
            ? Object.entries(colors).map(([name, code], index) =>
                name.includes("_id") ||
                name.includes("__v") ||
                name.includes("companyId") ? null : (
                  <ColorDisplay
                    key={name}
                    originalName={name}
                    name={
                      name == "base"
                        ? " Base Color"
                        : name == "searchBar"
                        ? "Search Bar Color"
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
  );
};

const ColorDisplay = ({
  originalName,
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
    onUpdateColor(originalName, newCode);
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

export default ColorCustomization;
