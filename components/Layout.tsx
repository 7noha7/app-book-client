// import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import React, { ReactNode } from "react";
// import Link from "next/link";

const appName = "B ♡×♡ K　LIST";
export const siteTitle ="B ♡×♡ K";

const Layout = ({children}:{children:ReactNode}) => {
  return (
    <div className={styles.container}>
     
      <header className={styles.header}>
<h1 className={utilStyles.headingTitle}>{appName}</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}

export default Layout;