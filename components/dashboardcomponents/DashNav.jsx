import React from "react";
import { Navbar, Nav } from "rsuite";
import { IoMdMenu } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const DashNav = ({ handleOpen, user, company, loading }) => {
  const router = useRouter();

  return (
    <div className="bg-red-500 shadow-sm shadow-[#0000002d]">
      <Navbar style={{ backgroundColor: "white" }}>
        <Navbar.Brand href="#">{company?.companyName} Store</Navbar.Brand>
        <Nav>
          <Nav.Item onClick={() => handleOpen("left")}>
            <IoMdMenu className="h-8 w-8 text-black" />
          </Nav.Item>
        </Nav>
        <Nav pullRight className="pr-16">
          <Nav.Item
          >
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
                toast.error("Logout Successfull", { autoClose: 2000})
                router.push("/login");
              }}
            >
              <p>Log out</p>
            </Nav.Item>
          </Nav.Menu>
        </Nav>
      </Navbar>
    </div>
  );
};

export default DashNav;
