import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TbEdit } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";
import toBase64 from "@/utilis/FileToBase64";
import axios from "@/app/api/axiosinterceptor";
import { Input, InputGroup } from "rsuite";
import { toast } from "react-hot-toast";

const PaymentMethod = ({ company, getUserAndCompanyDetail }) => {
  const [editOnePayment, seteditOnePayment] = useState(false);
  const [editTwoPayment, seteditTwoPayment] = useState(false);
  const [updateValues, setupdateValues] = useState({});
  const [changesOnePayment, setchangesOnePayment] = useState(false);
  const [changesTwoPayment, setchangesTwoPayment] = useState(false);
  const [payOne, setpayOne] = useState(false);
  const [payTwo, setpayTwo] = useState(false);
  const [backup, setbackup] = useState([]);

  const updateCompanyPaymentImage = async () => {
    const toastId = toast.loading("Updating Image...");
    try {
    await axios.put(`updatepaymentdetail/${company?._id}`, updateValues);
      toast.dismiss(toastId);
      setchangesTwoPayment(false);
      setchangesOnePayment(false);
      seteditTwoPayment(false);
      seteditOnePayment(false);
      setpayOne(false);
      setpayTwo(false);
      setupdateValues({});
      getUserAndCompanyDetail();
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
    <div className="  w-screen h-screen max-w-[100%]">
      <h1 className="text-orange-500 font-semibold text-[1.5rem] md:text-[2.5rem] text-center py-2 ">
        Your Payment Methods
      </h1>
      {changesOnePayment || changesTwoPayment || payOne || payTwo ? (
        <div className="mt-10 flex justify-center gap-2">
          <button
            className="rounded-xl py-1 px-2 md:px-6 md:py-3 bg-orange-500 text-[1.2rem] font-semibold "
            onClick={updateCompanyPaymentImage}
          >
            Update
          </button>
          <button
            className="rounded-xl py-1 px-2 md:px-6 md:py-3 bg-orange-500 text-[1.2rem] font-semibold "
            onClick={() => {
              setchangesTwoPayment(false);
              setchangesOnePayment(false);
              seteditTwoPayment(false);
              seteditOnePayment(false);
              setpayOne(false);
              setpayTwo(false);
              setupdateValues({});
            }}
          >
            Cancel Changes
          </button>
        </div>
      ) : null}
      <div className="h-fit flex justify-center">
        <div className="flex flex-col md:flex-row justify-center  gap-[10rem] p-4 w-[95vw] h-fit  ">
          <div className="w-fit ">
            <h1 className="font-semibold text-[1.2rem] my-3 text-slate-500">
              Payment Method 1
            </h1>
            <div className="relative group">
              {!editOnePayment ? (
                <>
                  <Image  
onError={(e) => {
                        e.target.src = "/fallbackimage.png"; // Provide the URL of your fallback image
                      }}
                    src={
                      changesOnePayment
                        ? updateValues?.onePayment
                        : company?.paymentOne?.qrImage ? `${company?.paymentOne?.qrImage }` : company?.paymentOne?.qrImage
                    }
                    height={300}
                    width={300}
                    className="shadow shadow-slate-500 h-[40vh] object-cover "
                    alt={`payment method of ${company?.companyName}`}
                  />
                  <div className="absolute hidden group-hover:flex group-hover:top-0 justify-center items-center h-[100%] w-[100%] bg-[#f8f8f8d6] ">
                    <TbEdit
                      className="text-[2.3rem] hover:text-orange-500 cursor-pointer "
                      onClick={() => {
                        seteditOnePayment(true);
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
                          onePayment: await toBase64(e.target.files[0]),
                        });
                        seteditTwoPayment(false);
                        seteditOnePayment(false);
                        setchangesOnePayment(true);
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
            <div className="mt-4">
              <InputGroup>
                <Input
                  type="text"
                  placeholder="Enter payment platform name..."
                  className={`font-semibold text-[1.2rem]  placeholder-black w-auto outline-0 ${
                    payOne ? "border-b-2 border-black" : ""
                  }`}
                  value={
                    payOne
                      ? updateValues.onePaymentName
                      : company.paymentOne?.methodName ? company.paymentOne?.methodName : ''
                  }
                  readOnly={!payOne}
                  onChange={(value) => {
                    setpayOne(true)
                    setupdateValues({
                      ...updateValues,
                      onePaymentName: value,
                    });
                  }}
                />
                <InputGroup.Addon>
                  <TbEdit
                    className="text-[1.8rem] hover:text-orange-500 cursor-pointer "
                    onClick={() => {
                      setpayOne(true);
                    }}
                  />
                </InputGroup.Addon>
              </InputGroup>
            </div>
          </div>
          <div className="w-fit ">
            <h1 className="font-semibold text-[1.2rem] my-3 text-slate-500">
              Payment Method 2
            </h1>
            <div className="relative group">
              {!editTwoPayment ? (
                <>
                  <Image  
onError={(e) => {
                        e.target.src = "/fallbackimage.png"; // Provide the URL of your fallback image
                      }}
                    src={
                      changesTwoPayment
                        ? updateValues?.twoPayment
                        : company?.paymentTwo?.qrImage ? `${company?.paymentTwo?.qrImage }` : company?.paymentTwo?.qrImage
                    }
                    height={300}
                    width={300}
                    className="shadow shadow-slate-500 h-[40vh] object-cover "
                    alt={`payment method of ${company?.companyName}`}
                  />
                  <div className="absolute hidden group-hover:flex group-hover:top-0 justify-center items-center h-[100%] w-[100%] bg-[#f8f8f8d6] ">
                    <TbEdit
                      className="text-[2.3rem] hover:text-orange-500 cursor-pointer "
                      onClick={() => {
                        seteditTwoPayment(true);
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
                          twoPayment: await toBase64(e.target.files[0]),
                        });
                        seteditOnePayment(false);
                        seteditTwoPayment(false);
                        setchangesTwoPayment(true);
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
            <div className="mt-4">
              <InputGroup>
                <Input
                  type="text"
                  placeholder="Enter payment platform name..."
                  className={`font-semibold text-[1.2rem]  placeholder-black w-auto outline-0 ${
                    payTwo ? "border-b-2 border-black" : ""
                  }`}
                  value={
                    payTwo
                      ? updateValues.twoPaymentName
                      : company.paymentTwo?.methodName ? company.paymentTwo?.methodName : ''
                  }
                  readOnly={!payTwo}
                  onChange={(value) => {
                    setpayTwo(true);
                    setupdateValues({
                      ...updateValues,
                      twoPaymentName: value,
                    });
                  }}
                />
                <InputGroup.Addon>
                  <TbEdit
                    className="text-[1.8rem] hover:text-orange-500 cursor-pointer "
                    onClick={() => {
                      setpayTwo(true);
                    }}
                  />
                </InputGroup.Addon>
              </InputGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
