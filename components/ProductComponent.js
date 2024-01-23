import React from "react";
import styles from "../styles/ProductComp.module.css";
import Link from "next/link";
const ProductComponent = ({
  imageUrl,
  imageName,
  productName,
  productPrice,
  discountPrice,
  productData,
  company,
}) => {
  return (
    <Link
      href={{
        pathname: `/singleproduct/${productData._id}`,
        query: {
          id: productData._id,
          comp: company.name,
          num: company.phone,
        }
      }}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.container} style={{ cursor: "pointer" }}>
        <div className={styles.imagecontainer} style={{padding: ".2rem .2rem 0rem .2rem"}}>
          <img src={`data:image/png;base64, ${imageUrl}`} alt={imageName} />
        </div>
        <div className={discountPrice ? styles.textcontainerdiscount : styles.textcontainer}>
          <h2 style={{ fontWeight: "600"}}>{productName}</h2>
          <div className={styles.pricecontainer}>
            {discountPrice ? (
              <>
                <p className={styles.cross}>${productPrice.toString()}</p>
                <p className={styles.discountedprice}>${discountPrice.toString()}</p>
              </>
            ) : (
              <p>${productPrice.toString()}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductComponent;