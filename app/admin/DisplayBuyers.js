import { ChakraProvider } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import BackBtnPop from "../../components/BackBtnPop";
import styles from "./Product.module.css";
import RemoveConfirmation from "../../components/RemoveConfirmation";
import cookieCutter from "cookie-cutter";
import axios from "../api/axiosinterceptor";
import Loader from "../../components/Loader";
import UpdateForm from "./UpdateForm";
import DownloadBtn from "../../components/DownloadBtn";

export default function TableTry() {
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

  const fetchBuyers = async () => {
    setisLoading(true);
    try {
      const res = await axios.get(`/getbuyers`, {
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
    fetchBuyers();
  }, [rerender]);

  let tableheadings = [
    "#",
    "Nombre",
    "Teléfono o WhatsApp",
    "Ciudad",
    "Pais",
    "Direccion de entrega",
  ];

  return (
    <div className={styles.wholepagewithtableholder}>
      <ChakraProvider>
        <DownloadBtn data={data} />
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
        <div className={styles.heading}>Compradores</div>
        <div className={styles.searchinput}>
          <div className={styles.one}>
            <input type="text" />
            <button onClick={search}>Búsqueda</button>
          </div>
          <div className={styles.two}>
            <button
              onClick={() => {
                setremoveApi("removeallbuyers");
                setinstantKey(data[0].companyName);
                setconfirmationPop(true);
                setrerender(!rerender);
              }}
            >
              Eliminar todos los compradores
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
        ) : isEmpty ? (
          <>
            <div className={styles.loadercontainer}>
              <h2 style={{fontSize: "1.5rem"}}>¡¡Datos no encontrados!!</h2>
            </div>
          </>
        ) : (
          <TableContainer overflowX="auto" style={{ width: "100vw" }}>
            <Table variant="simple" size="sm" overflowX="auto">
              {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
              <Thead>
                <Tr>
                  {tableheadings.map((heading) => {
                    return <Th key={Math.random()}>{heading}</Th>;
                  })}
                </Tr>
              </Thead>
              <Tbody>
                {data[0]?.companyName ? (
                  data?.map((buyer) => {
                    i++;
                    return (
                      <Tr key={buyer._id}>
                        <Td className={styles.sno}>{i}</Td>
                        <Td className={styles.name}>{buyer.name}</Td>
                        <Td className={styles.price}>{buyer.number}</Td>
                        <Td className={styles.company}>{buyer.city}</Td>
                        {buyer.country ? (
                          <Td className={styles.company}>{buyer.country}</Td>
                        ) : (
                          <>-</>
                        )}
                        {buyer.country ? (
                          <Td className={styles.deliveryaddress}>
                            {buyer.deliveryaddress}
                          </Td>
                        ) : (
                          <p>-</p>
                        )}
                      </Tr>
                    );
                  })
                ) : (
                  <Td className={styles.sno} style={{ textAlign: "center" }}>
                    No Buyers
                  </Td>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </ChakraProvider>
    </div>
  );
}
