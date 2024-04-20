import React from "react";
import Image from "next/image";
import { Modal } from "rsuite";
import { RxCross1 } from "react-icons/rx";

const FullImage = ({ fullImageUrl, openFI, sizeFI, handleCloseFI }) => {
  return (
    <div>
      <Modal size={sizeFI} open={openFI} onClose={handleCloseFI}>
        <Modal.Title>
          <RxCross1 onClick={handleCloseFI} className="cursor-pointer text-xl font-bold absolute right-8 top-2 hover:text-red-500 " />
        </Modal.Title>
        <Modal.Body className="">
          <Image
            src={fullImageUrl}
            height={100}
            width={100}
            className="h-[90vh] w-[90vw] object-contain"
            alt="payment proof full size image"
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FullImage;
