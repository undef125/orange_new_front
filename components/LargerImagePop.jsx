import React from 'react';
import styles from "./imagepop.module.css";
import Image from 'next/image';

export default function LargerImagePop({ setimagepop, image }) {
    return (
        <div className={styles.popcontainer}>
            <div className={styles.pop}>
                <div className={styles.crossholder}>
                    <img
                        src="/cross.png"
                        height="20"
                        width="20"
                        onClick={() => 
                            setimagepop(false)
                        }
                    />
                </div>
                <div className={styles.imagecontainer}>
                    <img 
                        src={image}
                        alt="s"
                    />
                </div>
            </div>
        </div>
    )
}
