import { ChakraProvider } from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'
import React, { useState, useEffect } from "react";
import BackBtnPop from "../../components/BackBtnPop";
import styles from "./Product.module.css";
import RemoveConfirmation from "../../components/RemoveConfirmation";
import cookieCutter from "cookie-cutter";
import axios from "../api/axiosinterceptor";
import Loader from "../../components/Loader";
import UpdateForm from "./UpdateForm";
import formatCurrency from "../../utilis/formatCurrency";

export default function EditProduct() {
    const [rerender, setrerender] = useState(false);
    const [data, setdata] = useState([]);
    const [alldata, setalldata] = useState([]);
    const [instantproduct, setinstantproduct] = useState("");
    const [instantKey, setinstantKey] = useState("");
    const [pop, setpop] = useState(false);
    const [confirmationPop, setconfirmationPop] = useState(false);
    const [isError, setisError] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const [isEmpty, setisEmpty] = useState(false);
    const [removeApi, setremoveApi] = useState("");

    let tableheadings = ["#", "Nombre del producto", "Precio", "Nombre de la empresa", "Editar productos"];

    const fetchProducts = async () => {
        setisLoading(true);
        try {
            const res = await axios.get(`/getproducts`, {
                headers: {
                    Authorization: `Bearer ${cookieCutter.get("accesstoken")}`,
                },
            });
            setdata(res.data.data);
            setalldata(res.data.data);
            res.data.data.length === 0 ? setisEmpty(true) : setisEmpty(false);
            setisError(false);
        } catch (error) {
            setisError(true);
        }
        setisLoading(false);
    };

    const search = (e) => {
        setdata(
            alldata.filter((product) => {
                if (
                    product.name
                        .toLowerCase()
                        .includes(`${e.target.previousElementSibling.value.toLowerCase()}`)
                ) {
                    return product;
                }
            })
        );
    };

    let i = 0;

    useEffect(() => {
        fetchProducts();
    }, [rerender]);

    return (
        <div className={styles.wholepagewithtableholder}>
        <ChakraProvider>
            <BackBtnPop />
            {confirmationPop ? (
                <RemoveConfirmation
                    identifier={instantKey}
                    setconfirmationPop={setconfirmationPop}
                    setrerender={setrerender}
                    rerender={rerender}
                    api={removeApi}
                />
            ) : null}
            {pop ? (
                <UpdateForm
                    pop={pop}
                    setpop={setpop}
                    product={instantproduct}
                    setrerender={setrerender}
                    rerender={rerender}
                />
            ) : null}
            <div className={styles.heading}>Edita la información de tus productos</div>
            <div className={styles.searchinput}>
                <div className={styles.one}>
                    <input type="text" />
                    <button onClick={search}>Buscar</button>
                </div>
                <div className={styles.two}>
                    <button
                        onClick={() => {
                            setremoveApi("removeallproducts");
                            setinstantKey(data[0].companyName);
                            setconfirmationPop(true);
                        }}
                    >
                        Eliminar todos los productos
                    </button>
                </div>
            </div>


            {isLoading ? (
                <Loader />

            ) : isError ? (
                <>
                    <div className={styles.loadercontainer}>
                        <h2 style={{fontSize: "1.5rem"}}>¡Hubo un error al obtener datos!</h2>
                    </div>
                </>
            )
                :

                isEmpty ? (
                    <>
                        <div className={styles.loadercontainer}>
                            <h2 style={{fontSize: "1.5rem"}}>¡¡Datos no encontrados!!</h2>
                        </div>
                    </>
                ) :
                    (
                        <TableContainer overflowX='auto' style={{ width: "100vw", padding: "0 .2rem", margin: "auto" }}>
                            <Table variant='simple' size='sm' overflowX="auto">
                                <Thead>
                                    <Tr>
                                        {tableheadings.map(heading => {
                                            return (
                                                <Th key={Math.random()}>{heading}</Th>
                                            )
                                        })}

                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data[0]?.companyName
                                        ? data?.map((product) => {
                                            i++;
                                            return (
                                                <Tr  key={product._id}>
                                                    <Td >{i}</Td>
                                                    <Td>{product.name}</Td>
                                                    <Td>
                                                        {formatCurrency(product.price.toString())}
                                                    </Td>
                                                    <Td >{product.companyName}</Td>
                                                    <Td className={styles.editproductsbtns}>
                                                        <button
                                                            id={product._id}
                                                            onClick={() => {
                                                                setinstantKey(product._id);
                                                                setremoveApi("/removeproduct");
                                                                setconfirmationPop(true);
                                                            }}
                                                        >
                                                            Eliminar
                                                        </button>
                                                        <button
                                                            id={product._id}
                                                            onClick={() => {
                                                                setinstantproduct(product);
                                                                setpop(true);
                                                            }}
                                                        >
                                                            Modificar
                                                        </button>
                                                    </Td>
                                                </Tr>
                                            )
                                        }) : <Td className={styles.sno} style={{ textAlign: "center" }}>No Buyers</Td>
                                    }
                                </Tbody>
                            </Table>
                        </TableContainer>
                    )}
        </ChakraProvider>
        </div>
    )
}
