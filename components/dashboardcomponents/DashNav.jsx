import React from "react";
import { Navbar, Nav } from "rsuite";
import { IoMdMenu } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Skeleton, SkeletonCircle } from "@chakra-ui/react";

const DashNav = ({ handleOpen, user, company, loading }) => {
  const router = useRouter();

  return (
    <>
      {company?.companyName ? (
        <div className="shadow-sm shadow-[#0000002d] bg-red-200">
          <Navbar style={{ backgroundColor: "white" }}>
            <Navbar.Brand href="#">{company?.companyName} Store</Navbar.Brand>
            <Nav>
              <Nav.Item onClick={() => handleOpen("left")}>
                <IoMdMenu className="h-8 w-8 text-black" />
              </Nav.Item>
            </Nav>
            <Nav pullRight className="pr-16">
              <Nav.Item>
                <FaRegUserCircle className="h-10 w-10 text-slate-500" />
                <div className="flex flex-col py-[1rem] ml-4">
                  <p className="text-[1.2rem] font-medium text-left">
                    {!loading ? (
                      <>
                        {user?.name} {user?.surname}
                      </>
                    ) : (
                      <Skeleton />
                    )}
                  </p>
                  <p className="text-[1rem] text-gray-400 ">{user?.email}</p>
                </div>
              </Nav.Item>
              <Nav.Menu title="">
                <Nav.Item
                  onClick={() => {
                    deleteCookie("token");
                    toast.error("Logout Successfull", { autoClose: 2000 });
                    router.push("/login");
                  }}
                >
                  <p>Log out</p>
                </Nav.Item>
              </Nav.Menu>
            </Nav>
          </Navbar>
        </div>
      ) : (
        <div className="h-[3.75rem] flex  items-center ">
          <div className="flex justify-between w-[100vw] w-max-[100%]">
            <div className="flex ml-[2rem] items-center gap-2">
              <Skeleton height="20px" className="w-[10rem]" />
              <Skeleton height="25px" className="w-[2rem]" />
            </div>
            <div className="flex gap-8 mr-[9rem]">
              <SkeletonCircle size="12" />
              <div className="flex flex-col gap-4">
                
                <Skeleton height="15px" className="w-[12rem]" />
                <Skeleton height="15px" className="w-[12rem]" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashNav;
