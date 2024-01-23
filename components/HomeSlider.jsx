import React, { useRef, useState } from "react";
import styles from "./displayimage.module.css"
import { ChakraProvider } from "@chakra-ui/react";
import LargerImagePop from "./LargerImagePop"


export default function DisplayImage({ imageArray }) {

    const scrollRef = useRef(null)
    const [imagepop, setimagepop] = useState(false);
    const [instantImage, setinstantImage] = useState("");

    const handlePrev = (e) => {
        let scrollwith = scrollRef.current.offsetWidth;
        scrollRef.current.scrollBy(scrollwith < 500 ? -320 : -500, 0)
    }
    const handleNext = (e) => {
        let scrollwith = scrollRef.current.offsetWidth;
        scrollRef.current.scrollBy(scrollwith < 500 ? 320 : 500, 0);

    }



    return (
        <div className={`slideContainer ${styles.slideContainerHome}`}>
            {imagepop && <LargerImagePop setimagepop={setimagepop} image={instantImage} />}
            <ChakraProvider>
                <section
                    className={styles.sliderHolderHome}
                >
                    <i
                        class="bx bxs-chevron-left secondary-color"
                        onClick={handlePrev}
                    ></i>
                    <div className={styles.categoriesholderhome} ref={scrollRef} style={{ display: "grid", gridTemplateColumns: `repeat(${imageArray.length}, 1fr)` }}>

                        {imageArray.map((item, index) => (
                            <div className={styles.catimageholderhome} key={Math.random()} onClick={() => {
                                setinstantImage(`data:${item.fileType};base64,${item.data}`);
                                setimagepop(true);
                            }}>
                                <img
                                    src={`data:${item.fileType};base64,${item.data}`}
                                    style={{ cursor: "pointer" }}
                                    height={500}
                                    width={500}
                                    className={index}

                                />
                            </div>
                        ))}

                    </div>
                    <i
                        class="bx bxs-chevron-right secondary-color"
                        onClick={handleNext}
                    ></i>
                </section>
            </ChakraProvider>

        </div>
    )
}
