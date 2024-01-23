import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/Product.module.css";
import { Button, ChakraProvider } from "@chakra-ui/react";

const ProductImageGallery = (props) => {
  const { productCat, setFilteredProducts, products, filteredProducts } = props;
  const [catData, setCatData] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    setCatData(productCat);
  }, [productCat]);

  const handleNext = (e) => {
    let scrollwith = scrollRef.current.offsetWidth;
    scrollRef.current.scrollBy(scrollwith < 500 ? 130 : 200, 0);
  };
  const handlePrev = (e) => {
    let scrollwith = scrollRef.current.offsetWidth;
    scrollRef.current.scrollBy(scrollwith < 500 ? -130 : -200, 0);
  };
  const filterProducts = (category) => {
    setFilteredProducts(
      products.filter((product) => product.category === category)
    );
  };
  return (
    <ChakraProvider>
      {/* <section className="section-margin">
        <ImageSlider products={products} />
      </section> */}
      {catData.length > 0 ? (
        <section
          className={styles.slidersection}
          style={{ textAlign: "center", width: "90vw", overflowX: "hidden" }}
        >
          <h2 className={styles.categoryHeader}>CATEGORÍAS</h2>

          <div className={styles.categoryContainer}>
            <i
              class="bx bxs-chevron-left secondary-color"
              onClick={handlePrev}
            ></i>
            <div className={styles.categoriesholder} ref={scrollRef}>
              {catData.map((item, index) => (
                <div
                  key={index}
                  className={styles.category}
                  onClick={() => filterProducts(item.category)}
                >
                  <div className={styles.catimageholder}>
                    <img
                      src={`data:image/png;base64, ${item.image[0].data}`}
                      alt={item.cateogry}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <div className={styles.textcontainer}>
                    <p>{item.category}</p>
                  </div>
                </div>
              ))}
            </div>

            <i
              class="bx bxs-chevron-right secondary-color"
              onClick={handleNext}
            ></i>
          </div>
          {filteredProducts.length === products.length ? null : (
            <Button
              colorScheme={"green"}
              onClick={() => setFilteredProducts(products)}
            >
              Ver todos los productos
            </Button>
          )}
        </section>
      ) : (
        <h3 style={{ fontSize: "2rem", margin: " 6rem auto" }}>
          No hay productos para mostrar
        </h3>
      )}
    </ChakraProvider>
  );
};

export default ProductImageGallery;
