import React, { useState, useEffect, useContext } from "react";
import ProductComponent from "../components/ProductComponent";
import ProductImageGallery from "../components/ProductImageGallery";
import ProductInfoComponent, {
  LinkContainerComponent,
} from "../components/ProductInfoComponent";
import styles from "../styles/Product.module.css";
import stylesFooter from "../styles/Footer.module.css";
import axios from "./api/axiosinterceptor";
import { IndexContext } from "../context";
import { useRouter } from "next/router";
import { Oval } from "react-loader-spinner";
import formatCurrency from "../utilis/formatCurrency";
import Image from "next/image";
import WhatsAppWId from "../components/WhatsAppWId";
import HomeSlider from "../components/HomeSlider";

const ProductPage = () => {
  const router = useRouter();

  const {
    products,
    setProducts,
    filteredProducts,
    setFilteredProducts,
    productCat,
    setProductCat,
  } = useContext(IndexContext);
  const { company, setCompany } = useContext(IndexContext);

  const [companyStatus, setcompanyStatus] = useState(false);
  const [loading, setloading] = useState(true);
  const [nostore, setnostore] = useState(false);

  const getCompanyDetails = async (cname) => {
    try {
      const res = await axios.get(`/getcompanydetails/${cname}`);
      setCompany(res.data.data[0]);
      setcompanyStatus(res.data.data[0].verified);
      setnostore(false);
    } catch (error) {
      setnostore(true);
      console.error("errorcheck: ", error);
    }
  };

  const fetchProducts = async (cname) => {
    setloading(true);
    try {
      const res = await axios.get(`/getproductsecom/${cname}`);
      setProducts(res.data.data);
      setFilteredProducts(res.data.data);
      const categories = [
        ...new Map(
          res.data.data.map((item) => [item["category"], item])
        ).values(),
      ];
      setProductCat(categories);
    } catch (error) {
      setnostore(true);
    }
    setloading(false);
  };

  useEffect(() => {
    if (!router.isReady) return;
    getCompanyDetails(
      router.query.cname.split("").includes("-")
        ? router.query.cname.split("-").join(" ")
        : router.query.cname
    );
    // if (products.length > 0) {
    //   products[0].companyName !== router.query.cname
    //     ? fetchProducts(router.query.cname)
    //     : setFilteredProducts(products);
    // } else {
    fetchProducts(
      router.query.cname.split("").includes("-")
        ? router.query.cname.split("-").join(" ")
        : router.query.cname
    );
    // }
    // eslint-disable-next-line
  }, [router.isReady]);

  useEffect(() => {}, [filteredProducts]);

  return (
    <div className="global-container" style={{ width: "100vw" }}>
      {nostore ? (
        <div
          style={{
            margin: "auto auto",
            textAlign: "center",
            color: "red",
            marginTop: "35vh",
            fontSize: "2rem",
          }}
        >
          URL de la tienda no válida
        </div>
      ) : loading || !company?.phone ? (
        <div className={"loader-container"}>
          <Oval
            height="80"
            width="80"
            radius="9"
            color="#e06331"
            ariaLabel="three-dots-loading"
            style={{
              position: "absolute",
              transform: "translate(-50%, -50%)",
              top: "50%",
              left: "50%",
            }}
          />
        </div>
      ) : !companyStatus ? (
        <div
          style={{
            margin: "auto auto",
            textAlign: "center",
            color: "red",
            marginTop: "35vh",
            fontSize: "2rem",
          }}
        >
          ¡Esta tienda está temporalmente deshabilitada debido al vencimiento de
          la suscripción!
        </div>
      ) : (
        <>
          {products && (
            <ProductInfoComponent
              productData={products[0]}
              products={products}
              company={company}
            />
          )}
          {company?.image.length > 0 ? (
            <HomeSlider imageArray={company?.image} />
          ) : (
            <> </>
          )}
          {filteredProducts?.length ? (
            <>
              {" "}
              <ProductImageGallery
                productCat={productCat}
                products={products}
                setFilteredProducts={setFilteredProducts}
                filteredProducts={filteredProducts}
              />
              <div className={styles.productContainer}>
                {filteredProducts?.map((item, index) => (
                  <ProductComponent
                    key={index}
                    imageUrl={`${item.image[0].data}`}
                    imageName={item.name}
                    productName={item.name}
                    productPrice={formatCurrency(item.price.toString())}
                    company={company}
                    discountPrice={
                      item.discountPrice
                        ? formatCurrency(item.discountPrice.toString())
                        : false
                    }
                    productData={item}
                  />
                ))}
              </div>
            </>
          ) : (
            <div style={{ fontSize: "2rem", margin: " 6rem auto" }}>
              No hay product{" "}
            </div>
          )}

          <div
            className={`section-margin ${stylesFooter.contactContainer} ${styles.contactContainer}`}
          >
            {company && company?.address ? (
              <>
                <LinkContainerComponent company={company} />
                <p className="address ">{company?.countrydetails}</p>
                <a className="address">
                  Dirección: <span>{company?.address}</span>
                </a>
                <a className="email" href={`mailto:${company?.email}`}>
                  E_mail: <span>{company?.email}</span>
                </a>
                <a href={`tel:${company?.postalCode}${company?.phone}`}>
                  <p className="phone">
                    WhatsApp: <span>{company?.phone}</span>
                  </p>
                </a>
                <a
                  className="postalcode"
                  href={`tel:${company?.postalCode}${company?.phone}`}
                >
                  Código postal: <span>{company?.postalCode}</span>
                </a>
                {company?.location ? (
                  <div
                    className={styles.locationbuttonholder}
                    onClick={() => {
                      window.open(company.location);
                    }}
                  >
                    <div className={styles.icon}>
                      <Image src="/location.png" width="20px" height="20px" />
                    </div>
                    <div className={styles.text}>Ubicacion:</div>
                    <div className={styles.btnimage}>
                      <Image src="/click.png" width="100px" height="30px" />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ) : null}
            <WhatsAppWId phone={company?.phone} />
          </div>
          <p className={styles.copyrightText} style={{ zIndex: "0" }}>
            Copyright &copy; - {company?.companyName}
          </p>
        </>
      )}
    </div>
  );
};

export default ProductPage;
