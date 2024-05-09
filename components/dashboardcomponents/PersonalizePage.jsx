import React, { useState, useRef, useEffect } from "react";
import { Input, InputGroup } from "rsuite";
import { MdOutlineDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { TbEdit } from "react-icons/tb";
import axios from "@/app/api/axiosinterceptor";
import { toast } from "react-hot-toast";
import { MdOutlinePageview } from "react-icons/md";

const PersonalizePage = ({ getUserAndCompanyDetail, company }) => {
  const [updateValues, setupdateValues] = useState({});
  const [currIndex, setcurrIndex] = useState(-1);
  const [read, setread] = useState(true);
  const [editing, setediting] = useState("");
  const [changesMade, setchangesMade] = useState(false);
  const [restoreValue, setrestoreValue] = useState("");
  const [shippingChoosen, setshippingChoosen] = useState();
  const [shippingClicked, setshippingClicked] = useState();
  // const [shippingValue, setshippingValue] = useState();

  const shipValRef = useRef(null);

  const updateCompanyDetails = async () => {
    const toastId = toast.loading("Updating details...");
    try {
      await axios.post(`updatecompanydetails/${company?._id}`, {
        ...updateValues,
        shippingCost:
          shippingChoosen == 0
            ? 0
            : shippingChoosen == 1
            ? "atcheckout"
            : shippingChoosen == 2
            ? shipValRef.current.value
            : "",
      });
      setchangesMade(false);
      setshippingChoosen(-1);
      setediting("");
      setupdateValues({});
      toast.dismiss(toastId);
      getUserAndCompanyDetail();
      toast.success("updated successfully!");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("updation failed!");
    }
  };

  useEffect(() => {
    setshippingChoosen(
      company?.shippingCost == "0"
        ? 0
        : company.shippingCost == "atcheckout"
        ? 1
        : 2
    );
    setshippingClicked(
      company?.shippingCost == "0"
        ? 0
        : company.shippingCost == "atcheckout"
        ? 1
        : 2
    );
    // if(company.shippingCost !== "atcheckout" && company.shippingCost !== "0") {
    //   shipValRef.current.value = company.shippingCost
    // }
  }, [company]);

  const styles = {
    marginBottom: 10,
  };
  return (
    <div className="w-[100vw] max-w-[100%] h-screen flex justify-center bg-slate-200">
      {console.log(shippingChoosen, shippingClicked)}
      <div className="mt-2">
        <div>
          <h1 className="text-center font-semibold text-[1.5rem] md:text-[3rem]">
            {company?.companyName.toUpperCase()} Store
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-[80vw] md:gap-x-4 mt-4">
          {company
            ? Object.keys(company).map((item, index) => {
                if (
                  [
                    "_id",
                    "companyName",
                    "__v",
                    "verified",
                    "createdYear",
                    "email",
                    "userId",
                    "coverImage",
                    "logoImage",
                    "image",
                    "paymentMethods",
                    "paymentOne",
                    "paymentTwo",
                    "shippingCost",
                    "checkoutDetails"
                  ].includes(item)
                )
                  return;
                return (
                  <div
                    key={index}
                    className={`${item === "socialMedias" ? "order-last" : ""}`}
                  >
                    {item}
                    {item === "socialMedias" ? (
                      <>
                        <div className="order-last grid grid-cols-2 gap-x-1">
                          {Object.keys(company[`${item}`]).map(
                            (smedia, idx) => {
                              return (
                                <InputGroup
                                  size="lg"
                                  inside
                                  style={styles}
                                  key={idx}
                                >
                                  <Input
                                    value={company[`${item}`][`${smedia}`]}
                                    className="w-[40rem]"
                                    readOnly={
                                      !read && currIndex === idx ? false : true
                                    }
                                    placeholder={`${smedia}`}
                                    onChange={(text) => {
                                      setupdateValues({
                                        ...updateValues,
                                        [item]: {
                                          ...updateValues[`${item}`],
                                          [smedia]: text,
                                        },
                                      });
                                      company[`${item}`][`${smedia}`] = text;
                                    }}
                                  />
                                  <InputGroup.Button>
                                    {editing === smedia ? (
                                      <div className="flex ">
                                        <MdOutlineDone
                                          className="text-[2rem] hover:text-green-500 cursor-pointer "
                                          onClick={() => {
                                            setediting("");
                                            setchangesMade(true);
                                            setread(true);
                                            company[`${item}`][`${smedia}`] =
                                              updateValues[`${item}`][
                                                `${smedia}`
                                              ];
                                          }}
                                        />
                                        <RxCross2
                                          className="text-[2rem] hover:text-red-500 cursor-pointer "
                                          onClick={() => {
                                            setediting("");
                                            setread(true);
                                            setupdateValues({
                                              ...updateValues,
                                              [item]: {
                                                [smedia]: "",
                                              },
                                            });
                                            company[`${item}`][`${smedia}`] =
                                              restoreValue;
                                            setrestoreValue("");
                                          }}
                                        />
                                      </div>
                                    ) : (
                                      <TbEdit
                                        className="text-[2rem] hover:text-orange-500 cursor-pointer "
                                        onClick={() => {
                                          setcurrIndex(idx);
                                          setread(false);
                                          setediting(smedia);
                                          setrestoreValue(
                                            company[`${item}`][`${smedia}`]
                                          );
                                        }}
                                      />
                                    )}
                                  </InputGroup.Button>
                                </InputGroup>
                              );
                            }
                          )}
                        </div>
                        <div>
                          <p>Choose Shipping Cost Option:</p>
                          <div className="flex gap-3">
                            <div
                              className="bg-green-300 px-4 py-2 rounded my-3 flex justify-center items-center"
                              style={{
                                backgroundColor:
                                  shippingClicked == 0 ||
                                  shippingChoosen == 0
                                    ? "white"
                                    : null,
                                border:
                                  shippingClicked == 0 ||
                                  shippingChoosen == 0
                                    ? "1px solid black"
                                    : null,
                              }}
                              onClick={() => {
                                setshippingChoosen(0);
                                setshippingClicked(0);
                                setchangesMade(true);
                                setupdateValues({
                                  ...updateValues,
                                  shippingCost: 0,
                                });
                              }}
                            >
                              Free
                            </div>
                            <div
                              className="bg-green-300 px-4 py-2 rounded my-3 flex justify-center items-center"
                              style={{
                                backgroundColor:
                                  shippingClicked == 1 ||
                                  shippingChoosen == 1
                                    ? "white"
                                    : null,
                                border:
                                  shippingClicked == 1 ||
                                  shippingChoosen == 1
                                    ? "1px solid black"
                                    : null,
                              }}
                              onClick={() => {
                                setshippingChoosen(1);
                                setshippingClicked(1);
                                setchangesMade(true);
                                setupdateValues({
                                  ...updateValues,
                                  shippingCost: "checkout",
                                });
                              }}
                            >
                              At Checkout
                            </div>
                            <div
                              className="bg-green-300 px-4 py-2 rounded my-3"
                              style={{
                                backgroundColor:
                                  shippingClicked == 2 ||
                                  shippingChoosen == 2
                                    ? "white"
                                    : null,
                                border:
                                  shippingClicked == 2 ||
                                  shippingChoosen == 2
                                    ? "1px solid black"
                                    : null,
                              }}
                              onClick={() => {
                                setshippingChoosen(2);
                                setshippingClicked(2);
                                setchangesMade(true);
                              }}
                            >
                              Set Cost
                              {shippingChoosen === 2 ? (
                                <>
                                  <input
                                    type="number"
                                    name="shippingcost"
                                    defaultValue={company.shippingCost}
                                    placeholder="set shipping cost"
                                    className="outline-0 py-1 px-2 rounded ml-3 border-2"
                                    ref={shipValRef}
                                  />
                                </>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div>
                        <InputGroup size="lg" inside style={styles}>
                          <Input
                            type={
                              ["postalCode"].includes(item) ? "number" : "text"
                            }
                            value={company[`${item}`]}
                            readOnly={
                              !read && currIndex === index ? false : true
                            }
                            placeholder={item}
                            className="w-[40rem]"
                            onChange={(text) => {
                              setupdateValues({
                                ...updateValues,
                                [`${item}`]: text,
                              });
                              company[`${item}`] = text;
                            }}
                          />
                          <InputGroup.Button>
                            {editing === item ? (
                              <div className="flex ">
                                <MdOutlineDone
                                  className="text-[2rem] hover:text-green-500 cursor-pointer "
                                  onClick={() => {
                                    setediting("");
                                    setchangesMade(true);
                                    setread(true);
                                    company[`${item}`] =
                                      updateValues[`${item}`];
                                  }}
                                />
                                <RxCross2
                                  className="text-[2rem] hover:text-red-500 cursor-pointer "
                                  onClick={() => {
                                    setediting("");
                                    setread(true);
                                    setupdateValues({
                                      ...updateValues,
                                      [item]: "",
                                    });
                                    company[`${item}`] = restoreValue;
                                    setrestoreValue("");
                                  }}
                                />
                              </div>
                            ) : (
                              <TbEdit
                                className="text-[2rem] hover:text-orange-500 cursor-pointer "
                                onClick={() => {
                                  setcurrIndex(index);
                                  updateValues[`${item}`] = company[`${item}`];
                                  setread(false);
                                  setediting(item);
                                  setrestoreValue(company[`${item}`]);
                                }}
                              />
                            )}
                          </InputGroup.Button>
                        </InputGroup>
                      </div>
                    )}
                  </div>
                );
              })
            : ""}
        </div>

        <div>
          {changesMade ? (
            <>
              <button
                className="rounded-xl px-6 py-3 bg-orange-500 text-[1.2rem] font-semibold "
                onClick={updateCompanyDetails}
              >
                Update Details
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PersonalizePage;
