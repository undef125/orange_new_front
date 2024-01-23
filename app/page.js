'use client';
import Navbar from "../components/AdminNavbar/NavBar";
// import HomePage from "../components/Home/HomePage";
import styles from "./homepage.module.css"
export default function Home() {
  return (
    <div className={styles.homepage}>
      <Navbar />
      {/* <HomePage /> */}
    </div>
  )
}
