import React, { useRef } from "react";
import styles from "./displayimage.module.css"
import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";


export default function DisplayImage({ imgdata }) {

  const activeStyling = {
    backgroundColor: "#55a4e0",
  }
  const inActiveStyling = {
    backgroundColor: "#ffffff",
  }

  const [activeBullet, setActiveBullet] = useState(0)
  let imageArray =
    imgdata.image.map(image => {
      return {
        url: `data:${image.contentType};base64,${image.data}`
      }
    });

  const handlePrev = (e) => {
    let scrollwith = scrollRef.current.offsetWidth;
    activeBullet > 0 ?
    setActiveBullet(activeBullet - 1)
    : null;
    scrollRef.current.scrollBy(scrollwith < 500 ? -scrollwith : -500, 0)
  }
  const handleNext = (e) => {
    let scrollwith = scrollRef.current.offsetWidth;
    activeBullet < imageArray.length - 1 ?
    setActiveBullet(activeBullet + 1) : null;
    scrollRef.current.scrollBy(scrollwith < 500 ? scrollwith : 500, 0)

  }

  const scrollRef = useRef(null);
  const imgconref = useRef(null);

  const changeActiveBullet = (e) => {
    let clickedBulletIndex = e.target.id;
    setActiveBullet(parseInt(clickedBulletIndex));
    let toChangeMultipleOf = clickedBulletIndex - activeBullet ;
    scrollRef.current.scrollBy(toChangeMultipleOf * 500, 0);
  }

  return (
    <div className={`slideContainer ${styles.slideContainer}`}>
      <ChakraProvider>
        <section
          className={styles.sliderHolder}
        >
          <i
            class="bx bxs-chevron-left secondary-color"
            onClick={handlePrev}
          ></i>
          <div className={styles.categoriesholder} ref={scrollRef} style={{ display: "gridd", gridTemplateColumns: `repeat(${imageArray.length}, 1fr)` }}>

            {imageArray.map((item, index) => (
              <div className={styles.catimageholder} key={Math.random()} ref={imgconref}>
                <img
                  src={item.url}
                  style={{ cursor: "pointer" }}
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
      <div className={styles.bulletholder}>
        {imageArray.map((image, index) =>
          <button className={styles.bullet} style={activeBullet === index ? activeStyling : inActiveStyling} id={index} key={index} onClick={changeActiveBullet}>
          </button>
        )}
      </div>
    </div>
  )
}