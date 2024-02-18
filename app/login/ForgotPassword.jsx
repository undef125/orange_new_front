import React, { useState } from "react";
import { Modal } from "rsuite";
import { Input, InputGroup } from "rsuite";
import { IoMailOutline } from "react-icons/io5";
import axios from "@/app/api/customerAxiosInterceptor";

const styles = {
  width: "60%",
  marginBottom: 10,
};

const ForgotPassword = ({ size, open, handleClose }) => {
  const [email, setemail] = useState("");
  const [otp, setotp] = useState("");
  const [password, setpassword] = useState("");
  const re = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;

  const sendOTP = async () => {
    try {
      if (email.match(re)) {
        await axios.post("/resetpasswordotp", {
          email,
        });
        console.log("otp send to your email: " + email);
      } else {
        console.log("Email is not valid");
      }
    } catch (error) {
      console.log("error sending otp", error);
    }
  };
  const resetPassword = async () => {
    try {
      if (email.match(re)) {
        await axios.post("/verifyotp", { otp,password });
        console.log("password reset successful");
        handleClose();
      } else {
        console.log("Email is not valid");
      }
    } catch (error) {
      console.log("error verifying otp");
    }
  };

  return (
    <Modal size={size} open={open} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>Reset Password</Modal.Title>
      </Modal.Header>
      <Modal.Body className="flex flex-col items-center justify-center gap-4">
        <InputGroup style={styles}>
          <Input
            placeholder="Enter your email..."
            onChange={(value) => {
              setemail(value);
            }}
          />
          <InputGroup.Button
            className="flex gap-3"
            onClick={() => {
              sendOTP();
            }}
          >
            <p className="font-semibold">Send OTP</p>
            <IoMailOutline className="text-[1.2rem]" />
          </InputGroup.Button>
        </InputGroup>
        <Input
          style={styles}
          placeholder="Enter otp sent to your mail.."
          onChange={(value) => {
            setotp(value);
          }}
        />
        <Input
          style={styles}
          placeholder="Enter new password..."
          onChange={(value) => {
            setpassword(value);
          }}
        />
        <div
          onClick={() => {
            resetPassword();
          }}
          className="flex bg-orange-400 justify-center py-1 font-medium px-5 rounded-lg text-lg gap-4 cursor-pointer transition-all duration-300 ease-in-out hover:bg-orange-500"
        >
          <div className="">
            <button type="button">Reset Password</button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPassword;
