import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import axios from "@/app/api/axiosinterceptor";
import { toast } from "react-hot-toast";
import { Modal } from "rsuite";
import { Dropdown } from "rsuite";
import { MdOutlinePageview } from "react-icons/md";
import FullImage from "./FullImage";

const DisplayOrders = ({ company }) => {
  const [currentProduct, setcurrentProduct] = useState({});
  const [orders, setorders] = useState([]);
  const [currentOrder, setcurrentOrder] = useState({});
  const [open, setOpen] = React.useState(false);
  const [size, setSize] = React.useState();
  const [showFullImage, setShowFullImage] = React.useState(false);
  const [fullImageUrl, setfullImageUrl] = React.useState("");
  const handleOpen = (value) => {
    setSize(value);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const deleteProduct = async (productId) => {
    const toastId = toast.loading("deleting....");
    try {
      await axios.delete(`deleteproduct/${productId}`);
      toast.dismiss(toastId);
      toast.success("successfully deleted product!");
    } catch (error) {
      toast.dismiss(toastId);
      toast.success("error deleting product!");
    }
  };
  const sortOrdersByDate = () => {
    const sortedOrders = [...orders].sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return -1;
      }
      if (a.createdAt > b.createdAt) {
        return 1;
      }
      return 0;
    });
    setorders(sortedOrders);
  };

  const sortOrderByAscendingPrice = () => {
    const sortedOrders = [...orders].sort((a, b) => {
      return a.totalAmount - b.totalAmount;
    });
    setorders(sortedOrders);
  };

  const sortOrderByDescending = () => {
    const sortedOrders = [...orders].sort((a, b) => {
      return b.totalAmount - a.totalAmount;
    });
    setorders(sortedOrders);
  };

  const getOrders = async () => {
    try {
      const resp = await axios.get(`/getorders/${company?._id}`);
      setorders(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //get orders
    getOrders();
  }, []);

  return (
    <div className="w-[100vw] max-w-[100%] h-screen flex justify-center bg-slate-200">
      <div className="w-[95%] md:w-[80%] flex flex-col items-center mt-[1rem]">
        <div>
          <h1 className="text-[1.5rem] md:text-[2.5rem] text-orange-500 ">
            Manage Your Products
          </h1>
        </div>
        <div className="my-2 mb-4 bg-red-200">
          <Dropdown title="Sort Orders By">
            <Dropdown.Item>
              <p
                onClick={() => {
                  sortOrdersByDate();
                }}
              >
                Date
              </p>
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                sortOrderByAscendingPrice();
              }}
            >
              Price Low To High
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                sortOrderByDescending();
              }}
            >
              Price High To Low
            </Dropdown.Item>
          </Dropdown>
        </div>
        <div className="flex justify-center">
          <TableContainer className=" w-[90vw] border-[2px] border-gray-300">
            <Table variant="simple" size="md" style={{ width: " 100%" }}>
              <Thead className="bg-slate-300 ">
                <Tr>
                  <Th>
                    <p className="text-orange-500 text-[1.2rem] font-medium">
                      Paid Through
                    </p>
                  </Th>
                  <Th>
                    <p className="text-orange-500 text-[1.2rem] font-medium">
                      Name
                    </p>
                  </Th>
                  <Th>
                    <p className="text-orange-500 text-[1.2rem] font-medium">
                      Delivery Address
                    </p>
                  </Th>
                  <Th>
                    <p className="text-orange-500 text-[1.2rem] font-medium">
                      Number
                    </p>
                  </Th>
                  <Th>
                    <p className="text-orange-500 text-[1.2rem] font-medium">
                      Total Amount
                    </p>
                  </Th>
                  <Th>
                    <p className="text-orange-500 text-[1.2rem] font-medium">
                      Ordered Date
                    </p>
                  </Th>
                  <Th>
                    <p className="text-orange-500 text-[1.2rem] font-medium">
                      Details
                    </p>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders.length > 0 ? (
                  <>
                    {orders.map((order, index) => {
                      return (
                        <Tr key={index}>
                          <Td>
                            <div className="flex flex-col gap-4 px-3 py-2 h-[100%] ">
                              <div>{order?.orderedFrom}</div>
                            </div>
                          </Td>
                          <Td>
                            <div className="flex flex-col gap-4 px-3 py-2 h-[100%] ">
                              <div>{order?.name}</div>
                            </div>
                          </Td>
                          <Td>
                            <div className="flex flex-col gap-4 px-3 py-2 h-[100%] ">
                              <div>{order?.deliveryaddress}</div>
                            </div>
                          </Td>
                          <Td>
                            <div className="flex flex-col gap-4 px-3 py-2 h-[100%] ">
                              <div>{order?.number}</div>
                            </div>
                          </Td>
                          <Td>
                            <div className="flex flex-col gap-4 px-3 py-2 h-[100%] ">
                              <div>${order?.totalAmount}</div>
                            </div>
                          </Td>
                          <Td>
                            <div className="flex flex-col gap-4 px-3 py-2 h-[100%] ">
                              <div>{order?.createdAt?.split("T")[0]}</div>
                            </div>
                          </Td>
                          <Td>
                            <div className="flex flex-col gap-4 px-3 py-2 h-[100%] ">
                              <div className="flex gap-6">
                                <button
                                  onClick={() => {
                                    setcurrentOrder(order);
                                    handleOpen();
                                  }}
                                  className="px-4 py-[8px] border-[1px] transition-all ease-in-out duration-300 bg-orange-500 text-[1.1rem] rounded-lg font-semibold hover:border-[1px] hover:border-orange-500 hover:bg-white"
                                >
                                  View Order Details
                                </button>
                                <button className="px-4 py-[8px] border-[1px] transition-all ease-in-out duration-300 bg-orange-500 text-[1.1rem] rounded-lg font-semibold hover:border-[1px] hover:border-orange-500 hover:bg-white">
                                  <a
                                    href={`https://wa.me/${order?.number}`}
                                    target="_blank"
                                  >
                                    Whatsapp
                                  </a>
                                </button>
                              </div>
                            </div>
                          </Td>
                        </Tr>
                      );
                    })}
                  </>
                ) : (
                  <div className="w-[100%]">
                    <p className="text-[1.5rem] font-semibold text-center">
                      No Orders Available
                    </p>
                  </div>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
        <DisplayOrderDetails
          size={size}
          open={open}
          handleClose={handleClose}
          currentOrder={currentOrder}
          setShowFullImage={setShowFullImage}
          showFullImage={showFullImage}
          fullImageUrl={fullImageUrl}
          setfullImageUrl={setfullImageUrl}
        />
      </div>
    </div>
  );
};

const DisplayOrderDetails = ({
  setShowFullImage,
  showFullImage,
  setfullImageUrl,
  fullImageUrl,
  size,
  open,
  handleClose,
  currentOrder,
}) => {
  const [openFI, setOpenFI] = React.useState(false);
  const [sizeFI, setSizeFI] = React.useState();
  const handleOpenFI = (value) => {
    setSizeFI(value);
    setOpenFI(true);
  };
  const handleCloseFI = () => setOpenFI(false);
  return (
    <Modal size={size} open={open} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        <div className=" ">
          {currentOrder?.paymentProof ? (
            <div className="my-2 flex justify-center items-center flex-col relative group">
              <p className="text-[.9rem] text-slate-400">Payment Proof Image</p>
              <Image
                onError={(e) => {
                  e.target.src = "/fallbackimage.png"; // Provide the URL of your fallback image
                }}
                src={`${currentOrder?.paymentProof}`}
                width={300}
                height={300}
                alt="cross"
                className="group-hover:bg-slate-200"
              />
              <div
                className="absolute hidden group-hover:flex"
                onClick={() => {
                  setShowFullImage(true);
                  setfullImageUrl(currentOrder?.paymentProof);
                  setOpenFI(true);
                  handleOpenFI("calc(100% - 20%)")
                }}
              >
                <MdOutlinePageview className="text-[3rem] cursor-pointer" />
              </div>
            </div>
          ) : null}
          <div className="grid grid-cols-2 gap-y-2">
            <div className="flex flex-col">
              <p className="text-[.9rem] text-slate-400">Name</p>
              <p className="text-[1rem] font-semibold">{currentOrder?.name}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-[.9rem] text-slate-400">Number</p>
              <p className="text-[1rem] font-semibold">
                {currentOrder?.number}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-[.9rem] text-slate-400">Delivery Address</p>
              <p className="text-[1rem] font-semibold">
                {currentOrder?.deliveryaddress}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-[.9rem] text-slate-400">Ordered Date</p>
              <p className="text-[1rem] font-semibold">
                {currentOrder?.createdAt?.split("T")[0]}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-[.9rem] text-slate-400">Country</p>
              <p className="text-[1rem] font-semibold">
                {currentOrder?.country}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-[.9rem] text-slate-400">Total Amount</p>
              <p className="text-[1rem] font-semibold">
                ${currentOrder?.totalAmount}
              </p>
            </div>
          </div>
          <p className="text-[.9rem] text-slate-400 mt-3 mb-1">
            Ordered Products
          </p>
          <div className="w-[100%] mx-auto">
            <TableContainer className=" w-[90vw] border-[1px] border-gray-100  ">
              <Table variant="simple" size="md" style={{ width: " 100%" }}>
                <Thead className="mt-10 ">
                  <Tr className="border-t-2 border-b-2">
                    <Th className="py-2 ">
                      <p className=" text-[1.1rem] font-medium">Image</p>
                    </Th>
                    <Th className="py-2 ">
                      <p className=" text-[1.1rem] font-medium">Name</p>
                    </Th>
                    <Th className="py-2 ">
                      <p className=" text-[1.1rem] font-medium">Quantity</p>
                    </Th>
                    <Th className="py-2 ">
                      <p className=" text-[1.1rem] font-medium">Size</p>
                    </Th>
                    <Th className="py-2 ">
                      <p className=" text-[1.1rem] font-medium">Price</p>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {currentOrder?.products?.map((product, index) => {
                    return (
                      <Tr key={index} className="border-b-2 ">
                        <Td>
                          <div className=" flex justify-center items-center">
                            <Image
                              onError={(e) => {
                                e.target.src = "/fallbackimage.png"; // Provide the URL of your fallback image
                              }}
                              src={`${product.image}`}
                              height="200"
                              width="200"
                              alt="category related image "
                              className="p-2 w-[6rem] h-[6rem] object-cover transition-all duration-300 ease-in-out"
                            />
                          </div>
                        </Td>
                        <Td>
                          <div className="flex flex-col justify-center items-center gap-4 px-3 py-0 h-[100%] ">
                            <div>{product?.name}</div>
                          </div>
                        </Td>
                        <Td>
                          <div className="flex flex-col justify-center items-center gap-4 px-3 py-0 h-[100%] ">
                            <div>{product?.quantity}</div>
                          </div>
                        </Td>
                        <Td>
                          <div className="flex flex-col justify-center items-center gap-4 px-3 py-0 h-[100%] ">
                            <div>{product?.size ? product?.size : "--"}</div>
                          </div>
                        </Td>
                        <Td>
                          <div className="flex flex-col justify-center items-center gap-4 px-3 py-0 h-[100%] ">
                            <div>${product?.price}</div>
                          </div>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
          {/* table for displaying products in order */}
        </div>
      </Modal.Body>
      <div className="absolute z-50">
        <FullImage
          fullImageUrl={fullImageUrl}
          openFI={openFI}
          setOpenFI={setOpenFI}
          sizeFI={sizeFI}
          setSizeFI={setSizeFI}
          handleOpenFI={handleOpenFI}
          handleCloseFI={handleCloseFI}
        />
      </div>
    </Modal>
  );
};

export default DisplayOrders;
