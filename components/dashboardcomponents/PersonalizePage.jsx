import React, { useEffect, useState } from "react";
import { Input, InputGroup } from "rsuite";
import { MdOutlineDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { TbEdit } from "react-icons/tb";
import axios from "@/app/api/axiosinterceptor";


const PersonalizePage = ({ getUserAndComapnyDetail,company }) => {
  const [updateValues, setupdateValues] = useState({});
  const [currIndex, setcurrIndex] = useState(-1);
  const [read, setread] = useState(true);
  const [editing, setediting] = useState("");
  const [changesMade, setchangesMade] = useState(false);
  const [restoreValue, setrestoreValue] = useState("");

 const updateCompanyDetails = async() => {
  try {
    await axios.post(`updatecompanydetails/${company?._id}`, updateValues)
    changesMade(false);
    setediting("");
  } catch (error) {
    console.log(error)
  }
 }
  const styles = {
    marginBottom: 10,
  };
  return (
    <div className="w-[100vw] h-screen flex justify-center bg-slate-200">
      <div className="mt-2">
        <div>
          <h1 className="text-center font-semibold text-[3rem]">
            {company?.companyName.toUpperCase()} Store
          </h1>
        </div>
        <div className="grid grid-cols-2 w-[80vw] gap-x-4 mt-4">
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
                  ].includes(item)
                )
                  return;
                return (
                  <div
                    className={`${item === "socialMedias" ? "order-last" : ""}`}
                  >
                    {item}
                    {item === "socialMedias" ? (
                      <div className="order-last">
                        {Object.keys(company[`${item}`]).map((smedia, idx) => {
                          return (
                            <InputGroup
                              size="lg"
                              inside
                              style={styles}
                              // className="order-last"
                            >
                              <Input
                                value={company[`${item}`][`${smedia}`]}
                                className="w-[40rem]"
                                readOnly={
                                  !read && currIndex === idx ? false : true
                                }
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
                                          updateValues[`${item}`][`${smedia}`];
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
                                            [smedia]: ""
                                          },
                                        });
                                        company[`${item}`][`${smedia}`] = restoreValue;
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
                        })}
                      </div>
                    ) : (
                      <div>
                        <InputGroup size="lg" inside style={styles}>
                          {console.log(updateValues)}
                          <Input
                           type={["postalCode"].includes(item) ? "number" : "text"}
                            value={company[`${item}`]}
                            readOnly={
                              !read && currIndex === index ? false : true
                            }
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
              <button className="rounded-xl px-6 py-3 bg-orange-500 text-[1.2rem] font-semibold "
              
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
