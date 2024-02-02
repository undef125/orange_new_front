"use client";
import React, { useState, useEffect } from "react";
import { Drawer } from "rsuite";
import DashNav from "@/components/dashboardcomponents/DashNav";
import { BiCategory } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { PiStackLight } from "react-icons/pi";
import { BsHddStack } from "react-icons/bs";
import PersonalizePage from "@/components/dashboardcomponents/PersonalizePage";
import CategoriesPage from "@/components/dashboardcomponents/CategoriesPage";
import ProductsPage from "@/components/dashboardcomponents/ProductsPage";
import axios from "@/app/api/axiosinterceptor";
import PageLoader from "@/components/PageLoader";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const [whichPage, setWhichPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [company, setCompany] = useState();

  const handleOpen = (key) => {
    setOpen(true);
    setPlacement(key);
  };

  const getUserAndComapnyDetail = async () => {
    try {
      const resp1 = await axios.get("/getmydetail");
      setUser(resp1.data.user)
      const resp2 = await axios.get("/getcompanydetails");
      setCompany(resp2.data.data[0])
    } catch (error) {
      console.log(error)
    }
  };
  // useEffect(() => {
  //   //call an api that get's the user detail
  // }, []);
  
  useEffect(() => {
    getUserAndComapnyDetail();
    const handleLoad = () => {
      setLoading(false);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      setLoading(true);

      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    // <>
    // <CategoriesPage company={company} />
    // </>
    <div>
      {loading ? (
        <PageLoader />
        // {console.log(resp1)}
      ) : (
        <>
          <DashNav handleOpen={handleOpen} user={user} company={company} />

          <Drawer
            size={"20rem"}
            closeButton={false}
            placement={placement}
            open={open}
            onClose={() => setOpen(false)}
          >
            <Drawer.Header>
              <Drawer.Title>
                <p className="font-medium text-center">Dashboard</p>{" "}
              </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body style={{ backgroundColor: "" }}>
              <div className="flex flex-col gap-y-[4rem] justify-center ">
                <div
                  onClick={() => {
                    setWhichPage(0);
                    setOpen(false);
                  }}
                >
                  <div className=" flex items-center gap-2 cursor-pointer text-[1.05rem] transition-all duration-300 ease-in-out text-slate-400 font-medium hover:text-orange-600">
                    <BsHddStack className="text-[1.4rem]" />
                    <p
                      className={`${whichPage === 0 ? "text-orange-500" : ""}`}
                    >
                      Initial Page
                    </p>
                  </div>
                </div>
                <div
                  className="flex flex-col gap-y-[1rem]"
                  onClick={() => {
                    setWhichPage(1);
                    setOpen(false);
                  }}
                >
                  <h1 className="font-semibold text-[1.3rem]">Personalize</h1>
                  <div>
                    <div className=" flex items-center gap-2 cursor-pointer text-[1.05rem] transition-all duration-300 ease-in-out text-slate-400 font-medium hover:text-orange-600">
                      <FaRegEdit className="text-[1.4rem]" />
                      <p
                        className={`${
                          whichPage === 1 ? "text-orange-500" : ""
                        }`}
                      >
                        My Orange store
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-y-[1rem]">
                  <h1 className="font-semibold text-[1.3rem] ">
                    Administrator
                  </h1>
                  <div
                    className=""
                    onClick={() => {
                      setWhichPage(2);
                      setOpen(false);
                    }}
                  >
                    <div className=" flex items-center gap-2 cursor-pointer text-[1.05rem] transition-all duration-300 ease-in-out text-slate-400 font-medium hover:text-orange-600">
                      <BiCategory className="text-[1.4rem]" />
                      <p
                        className={`${
                          whichPage === 2 ? "text-orange-500" : ""
                        }`}
                      >
                        Categories
                      </p>
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      setWhichPage(3);
                      setOpen(false);
                    }}
                  >
                    <div className=" flex items-center gap-2 cursor-pointer text-[1.05rem] transition-all duration-300 ease-in-out text-slate-400 font-medium hover:text-orange-600">
                      <PiStackLight className="text-[1.4rem]" />
                      <p
                        className={`${
                          whichPage === 3 ? "text-orange-500" : ""
                        }`}
                      >
                        Products
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Drawer.Body>
          </Drawer>

          <>
            {whichPage === 0 ? (
              <div>
                Main page ho hai yo initialize wala hai ta hai yad gar hai hai
                hai bhaneko hai
              </div>
            ) : whichPage === 1 ? (
              <PersonalizePage />
            ) : whichPage === 2 ? (
              <CategoriesPage company={company} />
            ) : whichPage === 3 ? (
              <ProductsPage />
            ) : null}
          </>
        </>
      )}
    </div>
  );
};

export default Page;
