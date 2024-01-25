import React, { useState } from "react";
import { Navbar, Nav } from "rsuite";
import CogIcon from "@rsuite/icons/legacy/Cog";
import MenuIcon from "@rsuite/icons/Menu";
import { IoMdMenu } from "react-icons/io";



const DashNav = ({  handleOpen }) => {
  return (
    <div className="bg-red-500 shadow-sm shadow-[#0000002d]">
      <Navbar style={{ backgroundColor: "white" }}>
        <Navbar.Brand href="#">Orange Store</Navbar.Brand>
        <Nav>
          <Nav.Item onClick={() => handleOpen("left")}>
            <IoMdMenu  className="h-8 w-8 text-black"   />
          </Nav.Item>
        </Nav>
        <Nav pullRight className="pr-16">
          <Nav.Item icon={<CogIcon />}>Johan Doe</Nav.Item>
          <Nav.Menu title="">
            <Nav.Item>Log out</Nav.Item>
            <Nav.Item>Team</Nav.Item>
          </Nav.Menu>
        </Nav>
      </Navbar>
    </div>
  );
};

export default DashNav;
