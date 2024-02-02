import React, { useState } from "react";
import { Navbar, Nav } from "rsuite";
// import CogIcon from "@rsuite/icons/legacy/Cog";
import { IoMdMenu } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";

const DashNav = ({ handleOpen, user,company }) => {

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
          // icon={<FaRegUserCircle className="h-8 w-8" />}
          >
            <FaRegUserCircle className="h-10 w-10 text-slate-500" />
            <div className="flex flex-col py-[1rem] ml-4">
              <p className="text-[1.2rem] font-medium text-left">
                {user?.name} {user?.surname}
              </p>
              <p className="text-[1rem] text-gray-400 ">{user?.email}</p>
            </div>
          </Nav.Item>
          <Nav.Menu title="">
            <Nav.Item>Log out</Nav.Item>
          </Nav.Menu>
        </Nav>
      </Navbar>
    </div>
  );
};

export default DashNav;
