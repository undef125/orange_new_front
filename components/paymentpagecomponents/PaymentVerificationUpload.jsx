import React, { useState } from "react";
import Image from "next/image";
import { Input } from "rsuite";
import toBase64 from "@/utilis/FileToBase64";
import axios from "@/app/api/axiosinterceptor"

const PaymentVerificationUpload = ({ gateway }) => {
  const [isError, setisError] = useState(false);
  const [formValues, setformValues] = useState({
    method: gateway,
    receiptNumber: "",
    receiptImage: "",
  });

  const sendPaymentVerificationRequest = async () => {
    try {
      if (formValues.method && formValues.receiptImage) {
        const resp = await axios.post("/sendverificationrequest", formValues);
        console.log(resp)
      } else {
        console.log("Error aayo hai");
        setisError(true);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" border-1 px-[2vw]">
      <div>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-8 col-span-2">
            <div className="flex justify-between flex-col">
              <p className="text-[1.1rem] text-slate-500 pb-4 ">
                Payment worth of 300USD
              </p>
              <div className="w-[100%]">
                <p>Product</p>
                <Input
                  size="md"
                  placeholder="Medium"
                  value={"Orange Subscription"}
                  style={{
                    backgroundColor: "#eeeded",
                    border: "2px solid #B6BBC4",
                    width: "100%",
                  }}
                />
              </div>
              <div>
                <p>Price</p>
                <Input
                  size="md"
                  placeholder="Medium"
                  value={"$300/year"}
                  style={{
                    backgroundColor: "#eeeded",
                    border: "2px solid #B6BBC4",
                  }}
                />
              </div>
              <div>
                <p>Method Of Payment</p>
                <Input
                  size="md"
                  placeholder="Medium"
                  value={`${gateway}`}
                  style={{
                    backgroundColor: "#eeeded",
                    border: "2px solid #B6BBC4",
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-10">
              <div>
                <p>Payment receipt number</p>
                <Input
                  size="md"
                  placeholder="Voucher Number"
                  value={formValues.receiptNumber}
                  style={{
                    // backgroundColor: "#eeeded",
                    border: "2px solid #B6BBC4",
                  }}
                  onChange={(textValue) => {
                    setformValues({...formValues, receiptNumber: textValue})
                  }}
                />
              </div>
              <div>
                <p>
                  Payment receipt image{" "}
                  {isError ? (
                    <span className="text-red-600 font-semibold">
                      {" "}
                      required
                    </span>
                  ) : null}
                </p>
                <input
                  type="file"
                  size="md"
                  placeholder="Medium"
                  accept=".png, .jpg, .jpeg"
                  style={{
                    border: "2px solid #B6BBC4",
                    width: "100%",
                  }}
                onChange={async (e) => {
                  setformValues({
                    ...formValues,
                    receiptImage: await toBase64(e.target.files[0]),
                  });
                }}
                />
              </div>
            </div>
            <button
              onClick={sendPaymentVerificationRequest}
              className="transition-all duration-300 w-[15rem] m-auto ease-in-out bg-orange-500 py-2 text-[1.2rem] font-semibold rounded-xl hover:text-slate-800 hover:border-[1px] hover:border-slate-800 hover:bg-white "
            >
              Send Verification
            </button>
          </div>
          <div className=" flex justify-center items-center  h-[100%]">
            <div>
              <Image
                src={`/payment/infante${
                  gateway === "nequi" ? "nequi" : "zille"
                }.png`}
                height="661"
                width="436"
                className=" w-[100%]"
                alt="payment information"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentVerificationUpload;
