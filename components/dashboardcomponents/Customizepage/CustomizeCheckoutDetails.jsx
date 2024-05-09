import React, { useState } from "react";
import { Switch } from "@chakra-ui/react";
import axios from "@/app/api/axiosinterceptor";
import { toast } from "react-hot-toast";

const CustomizeCheckoutDetails = ({ company }) => {
  // console.log(company.checkoutDetails)
  const [toggleChange, settoggleChange] = useState(false);
  const [updateValues, setupdateValues] = useState({});

  const updateCheckoutDetails = async (req, res) => {
    const toastId = toast.loading("Updating Image...");
    try {
      await axios.post(`/updatecheckoutdetails/${company?._id}`, {
        ...updateValues,
      });
      toast.dismiss(toastId);
      setupdateValues({});
      settoggleChange(false);
      toast.success("Details Updated Successfully!");
    } catch (error) {
      console.log(error);
      toast.dismiss(toastId);
      toast.error("Error Updating Details!");
    }
  };

  return (
    <div>
      {console.log(updateValues)}
      <p className="text-orange-500 font-semibold text-[1.5rem] md:text-[2.5rem] text-center my-2 ">
        Checkout Details Fields Customization
      </p>
      <div className="grid grid-cols-2 gap-2 mt-[2rem] w-[90vw] m-auto">
        {Object.keys(company.checkoutDetails).map((key, index) => {
          return (
            <div
              key={index}
              className="flex justify-between px-10 bg-slate-200 py-4 rounded"
            >
              <div>
                <p className="tex-xl font-bold">
                  {" "}
                  {key == "tableNumber"
                    ? "TABLE NUMBER"
                    : key == "customerWhatsapp"
                    ? "CUSTOMER WHATSAPP"
                    : key == "deliveryAddress"
                    ? "DELIVERY ADDRESS"
                    : key.toUpperCase()}
                </p>
              </div>
              <Switch
                className=""
                colorScheme="orange"
                size="lg"
                defaultChecked={company.checkoutDetails[key]}
                onChange={(e) => {
                  settoggleChange(true);
                  setupdateValues({
                    ...updateValues,
                    [key]: e.target.checked,
                  });
                }}
              />
            </div>
          );
        })}
      </div>
      {toggleChange ? (
        <div className="flex justify-center mt-6 ">
          <div className="flex gap-4">
            <button
              className="rounded-xl py-1 px-2 md:px-6 md:py-3 bg-orange-500 text-[1.2rem] font-semibold "
              onClick={updateCheckoutDetails}
            >
              Update
            </button>
            <button
              className="rounded-xl py-1 px-2 md:px-6 md:py-3 bg-orange-500 text-[1.2rem] font-semibold "
              onClick={() => {
                settoggleChange(false);
                setupdateValues({});
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CustomizeCheckoutDetails;
