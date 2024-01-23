import React from "react";
import Image from "next/image";
import styles from "./navbar.module.css";
import { CSVLink } from "react-csv";

export default function DownloadBtn({ data }) {
  let workingWithData;

  workingWithData = JSON.parse(JSON.stringify(data)); //for copying array by value not by reference

  for (let i = 0; i < workingWithData.length; i++) {
    delete workingWithData[i]["__v"];
    delete workingWithData[i]["_id"];
  }

  return (
    <div
      className={styles.downloadholder}
    >
      <CSVLink data={workingWithData}>
        <div
          className={styles.downiconholder}
        >
          <Image src="/download.png" height="45" width="45" />
        </div>
      </CSVLink>
    </div>
  );
}
