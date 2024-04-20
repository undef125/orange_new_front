"use client";
import React from "react";
import styles from "./navbar.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function BackBtnPop() {
  const router = useRouter();
  return (
    <div className={styles.backpopcontainer}>
      <div className={styles.popback}>
        <div
          className="buttonholder"
          onClick={() => {
            router.back();
          }}
        >
          <Image
            onError={(e) => {
              e.target.src = "/fallbackimage.png"; // Provide the URL of your fallback image
            }}
            src="/back.png"
            width="60"
            height="60"
            alt="back button"
          />
        </div>
      </div>
    </div>
  );
}
