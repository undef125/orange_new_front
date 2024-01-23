import React from 'react';
import styles from "./search.module.css"
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

export default function SearchPop({ company, setsearchPop, products }) {

    const [searchres, setsearchres] = useState([]);

    const handleChange = (e) => {
        if (e.target.value === "") {
            setsearchres([])
        } else {
            setsearchres(products.filter(product => {
                if (product.name.toLowerCase().includes(e.target.value.toLowerCase())) return product
            })
            )
        }
    }

    return (
        <>
            <div className={styles.inputpopcontainer}>
                <div className={styles.inputholder}>
                    <input type="text" placeholder="Escribe aquí el producto que quieres buscar" onChange={(e) => {
                        handleChange(e)
                    }} />
                </div>
                <div className={styles.crossholder} onClick={() => {
                    setsearchPop(false)
                }}>
                    <Image
                        src="/cross.png"
                        height={30}
                        width={30}
                    />
                </div>
            </div>
            <div className={styles.displayresult}>
                {searchres?.map(product => {
                    return (
                        <Link
                            href={{
                                pathname: `/singleproduct/${product._id}`,
                                query: {
                                    id: product._id,
                                    comp: company.name,
                                    num: company.phone,
                                }

                            }}
                            key={product._id}
                        >
                            <div className={styles.singleproduct} >
                                <div className={styles.searchedimageholder}>
                                    <Image
                                        src={`data:${product.image[0].contentType};base64,${product.image[0].data}`}
                                        height={100}
                                        width={100}
                                    />
                                </div>
                                <div className={styles.searchedtextcontainer}>
                                    {product.name}
                                </div>
                            </div>
                        </Link>
                    )
                })
                }

            </div>
        </>
    )
}
