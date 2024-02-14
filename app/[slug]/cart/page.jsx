"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useStoreContext } from "@/context/storeContext";
import CheckOutDetailFillup from "./CheckOutDetailFillup";
import { useParams } from "next/navigation";

const page = () => {
  const params = useParams();
  const [totalAmount, settotalAmount] = useState(0);
  const { cartItems, updateCartItem, removeCartItem } = useStoreContext();
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  const handleOpen = (value) => {
    setSize(value);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (acc, product) => acc + product.price * product.count,
      0
    );
    settotalAmount(totalPrice);
  }, [cartItems]);

 
  return (
    <div className="w-[96vw] grid grid-cols-1 md:grid-cols-3 ">
      <div className="col-span-2 flex flex-col justify-start pt-[10vh]">
        <h1 className="w-[80%] mx-auto font-semibold text-[1.2rem] my-3">
          Shopping Cart
        </h1>
        <div className="w-[80%] mx-auto">
          <TableContainer className=" w-[90vw] border-[1px] border-gray-100  ">
            <Table variant="simple" size="md" style={{ width: " 100%" }}>
              <Thead className="mt-10 ">
                <Tr className="border-t-2 border-b-2">
                  <Th className="py-6 ">
                    <p className=" text-[1.1rem] font-medium">Remove</p>
                  </Th>
                  <Th className="py-6 ">
                    <p className=" text-[1.1rem] font-medium">Image</p>
                  </Th>
                  <Th className="py-6 ">
                    <p className=" text-[1.1rem] font-medium">Name</p>
                  </Th>
                  <Th className="py-6 ">
                    <p className=" text-[1.1rem] font-medium">Price</p>
                  </Th>
                  <Th className="py-6 ">
                    <p className=" text-[1.1rem] font-medium">quantity</p>
                  </Th>
                  <Th className="py-6 ">
                    <p className=" text-[1.1rem] font-medium">Subtotal</p>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {cartItems.map((product, index) => {
                  return (
                    <Tr key={index} className="border-b-2 ">
                      <Td>
                        <div className="flex justify-center items-center gap-2 ">
                          <RxCross2
                            className="transition-all ease-in-out duration-300 hover:text-red-500 cursor-pointer hover:scale-105 h-[1.6rem] w-[1.6rem]"
                            onClick={() => {
                              removeCartItem(product?._id);
                            }}
                          />
                        </div>
                      </Td>
                      <Td>
                        <div className=" flex justify-center items-center">
                          <Image
                            src={`http://192.168.1.85:5000${product.images[0]}`}
                            height="200"
                            width="200"
                            alt="category related image "
                            className="p-4 w-[6rem] h-[6rem] object-cover transition-all duration-300 ease-in-out"
                          />
                        </div>
                      </Td>
                      <Td>
                        <div className="flex flex-col justify-center items-center gap-4 px-3 py-2 h-[100%] ">
                          <div>{product?.name}</div>
                        </div>
                      </Td>
                      <Td>
                        <div className="flex flex-col justify-center items-center gap-4 px-3 py-2 h-[100%] ">
                          <div>${product?.price}</div>
                        </div>
                      </Td>
                      <Td>
                        <div className="flex justify-center items-center gap-4 px-3 py-2 h-[100%] ">
                          <div>
                            <FaMinus
                              className="transition-all ease-in-out duration-300 cursor-pointer hover:text-red-200"
                              onClick={() => {
                                updateCartItem(product?._id, "-");
                              }}
                            />
                          </div>
                          <div>{product?.count}</div>
                          <div>
                            <FaPlus
                              className="transition-all ease-in-out duration-300 cursor-pointer hover:text-green-300"
                              onClick={() => {
                                updateCartItem(product?._id, "+");
                              }}
                            />
                          </div>
                        </div>
                      </Td>
                      <Td>
                        <div className="flex flex-col justify-center items-center gap-4 px-3 py-2 h-[100%] ">
                          <div>${product?.price * product?.count}</div>
                        </div>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="flex justify-start items-start pt-[10vh]  h-[100vh]">
        <div className="w-[95%]  ml-1 md:ml-0">
          <h1 className="font-semibold text-[1.2rem] my-3">Cart Totals</h1>
          <div className="md:w-[30rem] flex flex-col gap-4 ">
            <div className="h-[1px] bg-gray-400 md:w-[30rem] "></div>
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>${totalAmount}</p>
            </div>
            <div className="h-[1px] bg-gray-400 md:w-[30rem]"></div>
          </div>
          <div className="md:w-[30rem] flex flex-col gap-4 ">
            <div className="flex justify-between mt-4">
              <p>Shipping</p>
              <p>Free</p>
            </div>
            <div className="h-[1px] bg-gray-400 md:w-[30rem]"></div>
          </div>
          <div className="md:w-[30rem] flex flex-col gap-4 ">
            <div className="flex justify-between">
              <p className="font-semibold text-[1.2rem] ">Total</p>
              <p className="font-semibold text-[1.2rem] ">${totalAmount}</p>
            </div>
          </div>
          {cartItems.length > 0 ? (
            <div className="flex justify-center">
              <button
                onClick={() => {
                  handleOpen("50rem");
                }}
                className="bg-slate-700 text-slate-100 font-semibold text-[1.1rem] px-2 py-2 rounded my-4"
              >
                Proceed To Checkout
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <CheckOutDetailFillup
        size={size}
        open={open}
        handleClose={handleClose}
        cartItems={cartItems}
        totalAmount={totalAmount}
      />
    </div>
  );
};

export default page;
