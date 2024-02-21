"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Drawer } from "rsuite";
import DashNav from "@/components/dashboardcomponents/DashNav";
import { BiCategory } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { PiStackLight } from "react-icons/pi";
import { BsHddStack } from "react-icons/bs";
import PersonalizePage from "@/components/dashboardcomponents/PersonalizePage";
import CustomizePage from "@/components/dashboardcomponents/CustomizePage";
import CategoriesPage from "@/components/dashboardcomponents/CategoriesPage";
import ProductsPage from "@/components/dashboardcomponents/ProductsPage";
import axios from "@/app/api/axiosinterceptor";
import protectRoute from "@/utilis/protectRoute";
import { LuPackageOpen } from "react-icons/lu";
import DisplayOrders from "@/components/dashboardcomponents/DisplayOrders";
import Image from "next/image";
import PaymentMethod from "@/components/dashboardcomponents/PaymentMethod";

const Page = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const [whichPage, setWhichPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [company, setCompany] = useState();

  const handleOpen = (key) => {
    setOpen(true);
    setPlacement(key);
  };

  const getUserAndComapnyDetail = async () => {
    try {
      const resp1 = await axios.get("/getmydetail");
      setUser(resp1.data.user);
      const resp2 = await axios.get("/getcompanydetails");
      setCompany(resp2.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {}, [user]);

  useEffect(() => {
    const handleRouteProtection = async () => {
      if (!(await protectRoute())) router.push("/payment");
      else getUserAndComapnyDetail();
    };
    handleRouteProtection();
  }, []);

  return (
    <div>
      <>
        <DashNav
          handleOpen={handleOpen}
          user={user}
          company={company}
          loading={loading}
        />

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
                  <p className={`${whichPage === 0 ? "text-orange-500" : ""}`}>
                    Initial Page
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-y-[1rem]">
                <h1 className="font-semibold text-[1.3rem]">Personalize</h1>
                <div
                  onClick={() => {
                    setWhichPage(1);
                    setOpen(false);
                  }}
                  className=" flex items-center gap-2 cursor-pointer text-[1.05rem] transition-all duration-300 ease-in-out text-slate-400 font-medium hover:text-orange-600"
                >
                  <FaRegEdit className="text-[1.4rem]" />
                  <p className={`${whichPage === 1 ? "text-orange-500" : ""}`}>
                    Customize Store
                  </p>
                </div>
                <div
                  onClick={() => {
                    setWhichPage(2);
                    setOpen(false);
                  }}
                  className=" flex items-center gap-2 cursor-pointer text-[1.05rem] transition-all duration-300 ease-in-out text-slate-400 font-medium hover:text-orange-600"
                >
                  <FaRegEdit className="text-[1.4rem]" />
                  <p className={`${whichPage === 2 ? "text-orange-500" : ""}`}>
                    My Store
                  </p>
                </div>
                <div
                  onClick={() => {
                    setWhichPage(3);
                    setOpen(false);
                  }}
                  className=" flex items-center gap-2 cursor-pointer text-[1.05rem] transition-all duration-300 ease-in-out text-slate-400 font-medium hover:text-orange-600"
                >
                  <FaRegEdit className="text-[1.4rem]" />
                  <p className={`${whichPage === 3 ? "text-orange-500" : ""}`}>
                    Payment Methods
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-y-[1rem]">
                <h1 className="font-semibold text-[1.3rem] ">Administrator</h1>
                <div
                  className=""
                  onClick={() => {
                    setWhichPage(4);
                    setOpen(false);
                  }}
                >
                  <div className=" flex items-center gap-2 cursor-pointer text-[1.05rem] transition-all duration-300 ease-in-out text-slate-400 font-medium hover:text-orange-600">
                    <BiCategory className="text-[1.4rem]" />
                    <p
                      className={`${whichPage === 4 ? "text-orange-500" : ""}`}
                    >
                      Categories
                    </p>
                  </div>
                </div>
                <div
                  onClick={() => {
                    setWhichPage(5);
                    setOpen(false);
                  }}
                >
                  <div className=" flex items-center gap-2 cursor-pointer text-[1.05rem] transition-all duration-300 ease-in-out text-slate-400 font-medium hover:text-orange-600">
                    <PiStackLight className="text-[1.4rem]" />
                    <p
                      className={`${whichPage === 5 ? "text-orange-500" : ""}`}
                    >
                      Products
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-[1rem]">
                <h1 className="font-semibold text-[1.3rem] ">Orders</h1>
                <div
                  className=""
                  onClick={() => {
                    setWhichPage(6);
                    setOpen(false);
                  }}
                >
                  <div className=" flex items-center gap-2 cursor-pointer text-[1.05rem] transition-all duration-300 ease-in-out text-slate-400 font-medium hover:text-orange-600">
                    <LuPackageOpen className="text-[1.4rem]" />
                    <p
                      className={`${whichPage === 6 ? "text-orange-500" : ""}`}
                    >
                      Orders
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Drawer.Body>
        </Drawer>

        <>
          {whichPage === 0 ? (
            <div className=" items-center w-screen h-screen max-w-[100%] flex flex-1 justify-center bg-slate-200">
              <div className="bg-slate-300 rounded px-4">
                <div className="flex justify-center items-center mb-4 p-2 ">
                  <Image
                    src={"/home_page/company.png"}
                    height={200}
                    width={200}
                    alt="store"
                  />
                </div>
                <hr />
                <div className="pb-2">
                  <button
                    onClick={() => {
                      router.push(`${company?.companyName}`);
                    }}
                    className="bg-orange-500 font-semibold text-white px-8 py-2 rounded text-[1.1rem] border-[2px] transition-all duration-300 ease-in-out hover:bg-white hover:border-[2px] hover:border-orange-500 hover:text-black "
                  >
                    Take me to the store
                  </button>
                </div>
              </div>
            </div>
          ) : whichPage === 1 ? (
            <CustomizePage
              company={company}
              getUserAndComapnyDetail={getUserAndComapnyDetail}
              setUser={setUser}
            />
          ) : whichPage === 2 ? (
            <PersonalizePage
              getUserAndComapnyDetail={getUserAndComapnyDetail}
              company={company}
            />
          ) : whichPage === 3 ? (
            <PaymentMethod
              getUserAndComapnyDetail={getUserAndComapnyDetail}
              company={company}
            />
          ) : whichPage === 4 ? (
            <CategoriesPage company={company} />
          ) : whichPage === 5 ? (
            <ProductsPage company={company} />
          ) : whichPage === 6 ? (
            <DisplayOrders company={company} />
          ) : null}
        </>
      </>
    </div>
  );
};

export default Page;
