import styles from "../styles/ProductInfoComp.module.css";
import React from "react";

export default function LinkContainerComponent({ company }) {

  const links = [
    {
      name: "Youtube",
      icon: "bx bxl-youtube",
      color: "#ff281c",
      link: `${company?.socialMedias?.youtube ? company.socialMedias.youtube : ""}`,
      image: "/Social_Media_Icons/youtube_icon.png",
    },
    {
      name: "Facebook",
      icon: "bx bxl-facebook",
      color: "#3b5998",
      link: `${company?.socialMedias?.facebook ? company.socialMedias.facebook : ""}`,
      image: "/Social_Media_Icons/facebook_icon.png",
    },
    {
      name: "Instagram",
      icon: "bx bxl-instagram",
      color: "#fbad50",
      link: `${company?.socialMedias?.instagram ? company.socialMedias.instagram : ""}`,
      image: "/Social_Media_Icons/instagram_icon.png",
    },
    {
      name: "Tiktok",
      icon: "bx bxl-tiktok",
      color: "#ff0050",
      link: `${company?.socialMedias?.tiktok ? company.socialMedias.tiktok : ""}`,
      image: "/Social_Media_Icons/tiktok_icon.png",
    },
    {
      name: "Twitter",
      icon: "bx bxl-twitter",
      color: "#1da1f2",
      link: `${company?.socialMedias?.twitter ? company.socialMedias.twitter : ""}`,
      image: "/Social_Media_Icons/Twitter_Icon.png",
    },
    {
      name: "web",
      icon: "bx bxl-internet-explorer",
      color: "#00679B",
      link: `${company?.socialMedias?.website ? company.socialMedias.website : ""}`,
      image: "/Social_Media_Icons/WEB_page_icon.png",
    },

  ];

  return (
    <div className={styles.linkContainer}>
      {links.map((item, index) =>
        item.link !== "" ? (
            <div onClick={() => window.open(item.link)} key={Math.random()}>
              <img
                src={item.image}
                alt={item.name}
                className={styles.icon}
              ></img>
            </div>
        ) : <></>
      )}
    </div>
  );
};