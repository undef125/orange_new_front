import React, { useState, useEffect } from "react";
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
import { Modal } from "rsuite";
import { IoMdAdd } from "react-icons/io";
import axios from "@/app/api/axiosinterceptor";
import UpdateInputs from "./UpdateInputs";
import toBase64 from "@/utilis/FileToBase64";
import { MdDelete } from "react-icons/md";
import { toast } from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";

const ListingProducts = ({ products, catNames, getProducts }) => {
  const [editing, setediting] = useState("");
  const [currentProduct, setcurrentProduct] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = (value) => {
    setOpen(true);
    setediting("");
  };
  const handleClose = () => setOpen(false);

  const deleteProduct = async (productId) => {
    const toastId = toast.loading("deleting....");
    try {
      await axios.delete(`deleteproduct/${productId}`);
      getProducts();
      toast.dismiss(toastId);
      toast.success("successfully deleted product!");
    } catch (error) {
      toast.dismiss(toastId);
      toast.success("error deleting product!");
    }
  };

  return (
    <>
      <TableContainer className=" w-[90vw] border-[2px] border-gray-300">
        <Table variant="simple" size="md" style={{ width: " 100%" }}>
          <Thead className="bg-slate-300 ">
            <Tr>
              <Th>
                <p className="text-orange-500 text-[1.2rem] font-medium">
                  Image
                </p>
              </Th>
              <Th>
                <p className="text-orange-500 text-[1.2rem] font-medium">
                  Name
                </p>
              </Th>
              <Th>
                <p className="text-orange-500 text-[1.2rem] font-medium">
                  Price
                </p>
              </Th>
              <Th>
                <p className="text-orange-500 text-[1.2rem] font-medium">
                  Modify
                </p>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.length > 0 ? (
              <>
                {products.map((product, index) => {
                  return (
                    <Tr key={index}>
                      <Td>
                        <div className=" flex flex-col rounded   relative">
                          <Image
                            onError={(e) => {
                              e.target.src = "/fallbackimage.png"; // Provide the URL of your fallback image
                            }}
                            src={`${product.images[0]}`}
                            height="200"
                            width="200"
                            alt="category related image "
                            className="p-4 w-[6rem] h-[6rem] object-cover transition-all duration-300 ease-in-out"
                          />
                        </div>
                      </Td>
                      <Td>
                        <div className="flex flex-col gap-4 px-3 py-2 h-[100%] ">
                          <div>{product?.name}</div>
                        </div>
                      </Td>
                      <Td>
                        <div className="flex flex-col gap-4 px-3 py-2 h-[100%] ">
                          <div>${product?.price}</div>
                        </div>
                      </Td>
                      <Td>
                        <div className="flex flex-col gap-4 px-3 py-2 h-[100%] ">
                          <div className="flex gap-6">
                            <button
                              onClick={() => {
                                setcurrentProduct(product);
                                handleOpen();
                              }}
                              className="px-4 py-[8px] border-[1px] transition-all ease-in-out duration-300 bg-orange-500 text-[1.1rem] rounded-lg font-semibold hover:border-[1px] hover:border-orange-500 hover:bg-white"
                            >
                              Edit Product
                            </button>
                            <button
                              onClick={() => {
                                deleteProduct(product?._id);
                              }}
                              className="px-4 py-[8px] border-[1px] transition-all ease-in-out duration-300 bg-orange-500 text-[1.1rem] rounded-lg font-semibold hover:border-[1px] hover:border-orange-500 hover:bg-white"
                            >
                              Delete Product
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
                  No Products Available
                </p>
              </div>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <ProductEditModal
        open={open}
        handleClose={handleClose}
        product={currentProduct}
        catNames={catNames}
        editing={editing}
        setediting={setediting}
        getProducts={getProducts}
      />
    </>
  );
};

const ProductEditModal = ({
  open,
  handleClose,
  product,
  catNames,
  editing,
  setediting,
  getProducts,
}) => {
  const [updateValues, setupdateValues] = useState({ images: [] });
  const [changesMade, setchangesMade] = useState(false);

  const updateProduct = async () => {
    try {
      await axios.put(`updateproduct/${product?._id}`, updateValues);
      getProducts();
    } catch (error) {
      console.log("error: " + error);
    }
  };
  const deleteImage = async (imageName) => {
    try {
      await axios.put(`deleteproductimage/${product?._id}`, {
        imageName,
      });
      getProducts();
    } catch (error) {
      console.log("error: " + error);
    }
  };

  const ftnToRemoveSize = (index) => {
    const updatedSizes = [...(updateValues.sizes || product.sizes)];
    updatedSizes.splice(index, 1);
    setupdateValues({
      ...updateValues,
      sizes: updatedSizes,
      totalQuantity: updatedSizes.reduce(
        (accumulator, sizeobj) => accumulator + sizeobj.quantity,
        0
      ),
    });
    setchangesMade(true);
  };

  return (
    <Modal size={"calc(100% - 120px)"} open={open} onClose={handleClose}>
      {console.log(updateValues)}
      <Modal.Header>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p className="text-[1.3rem] font-medium">Images:</p>
          <div className="flex  ">
            {product?.images?.map((image, index) => {
              return (
                <div className="relative group" key={index}>
                  <div className=" flex flex-col flex-wrap rounded   relative">
                    <Image
                      onError={(e) => {
                        e.target.src = "/fallbackimage.png";
                      }}
                      src={`${image}`}
                      height="200"
                      width="200"
                      alt="category related image "
                      className="p-4 w-[7rem] h-[7rem] object-cover transition-all duration-300 ease-in-out rounded-3xl"
                    />
                  </div>
                  <div className="absolute hidden group-hover:flex justify-center items-center top-1 h-[7rem] w-[100%] bg-[#f8f8f8d6] ">
                    <MdDelete
                      className="text-[2.3rem] hover:text-red-500 cursor-pointer "
                      onClick={() => {
                        // setcurrentCatIndex(index);
                        // setimage(true);
                        deleteImage(image);
                      }}
                    />
                  </div>
                </div>
              );
            })}
            <div className="bg-green-100 w-[5rem] cursor-pointer rounded-xl my-auto h-[5rem] flex justify-center items-center">
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={async (e) => {
                  setupdateValues({
                    ...updateValues,
                    images: [
                      ...updateValues?.images,
                      await toBase64(e.target.files[0]),
                    ],
                  });
                  setchangesMade(true);
                }}
              />
              <label
                htmlFor="fileInput"
                className="cursor-pointer h-[100%] w-[100%] flex items-center justify-center"
              >
                <IoMdAdd className="text-[2rem] " />
              </label>
            </div>
            <div className="flex">
              {updateValues?.images?.map((image, index) => {
                return (
                  <div
                    className=" flex flex-col flex-wrap rounded   relative"
                    key={index}
                  >
                    <Image
                      onError={(e) => {
                        e.target.src = "/fallbackimage.png"; // Provide the URL of your fallback image
                      }}
                      src={`${image}`}
                      height="200"
                      width="200"
                      alt="category related image "
                      className="p-4 w-[7rem] h-[7rem] object-cover transition-all duration-300 ease-in-out rounded-3xl"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-y-6">
          {Object.keys(product).map((keyName, index) => {
            if (
              !["__v", "_id", "images", "companyId", "sizes"].includes(keyName)
            ) {
              return (
                <UpdateInputs
                  product={product}
                  keyName={keyName}
                  updateValues={updateValues}
                  setupdateValues={setupdateValues}
                  editing={editing}
                  setediting={setediting}
                  setchangesMade={setchangesMade}
                  catNames={catNames}
                  key={index}
                />
              );
            }
          })}
          <div>
            <p>Sizes:</p>
            <div className="flex gap-4 ">
              {(updateValues?.sizes || product?.sizes)?.map((item, index) => (
                <div key={index} className="">
                  <div className="flex gap-2 items-center">
                    <p>{item.size.toUpperCase()} </p>
                    <p>{item.quantity}</p>
                    <MdDeleteForever onClick={() => ftnToRemoveSize(index)} />
                  </div>
                </div>
              ))}
            </div>
          </div>{" "}
        </div>
      </Modal.Body>
      <Modal.Footer>
        {changesMade ? (
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                updateProduct();
                handleClose();
                setupdateValues({ images: [] });
                getProducts();
              }}
              className="rounded-xl px-6 py-3 bg-orange-500 text-[1.2rem] font-semibold "
            >
              Update Product
            </button>
            <button
              onClick={() => {
                setediting("");
                setupdateValues({ images: [] });
                handleClose();
                getProducts();
              }}
              className="rounded-xl px-6 py-3 bg-orange-500 text-[1.2rem] font-semibold "
            >
              Cancel
            </button>
          </div>
        ) : null}
      </Modal.Footer>
    </Modal>
  );
};

export default ListingProducts;
