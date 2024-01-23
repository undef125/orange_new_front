import React from 'react';
import styles from "./sizes.module.css";
import Image from 'next/image';

export default function SizesPop({ setsizespop, id, sizes, handleAddToCart }) {
    return (
        <div className={styles.sizespopcontainer}>
            <div className={styles.wholecontainer}>
                <div className={styles.crossholder} >
                    <h3 style={{ fontWeight: "800", fontSize: "1.1rem", textAlign: "center" }}>{sizes.split(",")[0]}</h3>
                    <div className={styles.imageholder}>
                        <Image
                            src="/cross.png"
                            height="23px"
                            width="25px"
                            onClick={() => setsizespop(false)}
                        />

                    </div>
                </div>
                <div className={styles.sizescontainer}>
                    {sizes.split(",").slice(1).map((size, index) => {
                            return (
                                <div className={styles.singlesizeholder} key={Math.random()} onClick={() => {
                                    setsizespop(false)
                                    handleAddToCart(id, size);
                                }}>
                                    {size}
                                </div>
                            )
                    })}
                </div>
            </div>
        </div>
    )
}
