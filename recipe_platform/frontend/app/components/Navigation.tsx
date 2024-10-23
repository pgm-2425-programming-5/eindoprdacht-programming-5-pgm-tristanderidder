"use client";

import Link from "next/link";

import styles from "./styles/Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <h1 className={styles.title}>Flavorelle</h1>
      <div className={styles.links}>
        <Link className={styles.link} href={"/"}>
          Notifications
        </Link>
        <Link className={styles.link} href="/recipe">
          Chat
        </Link>
        <Link className={styles.linkColor} href="/recipe/create">
          Add Recipe
        </Link>
        <Link className={styles.link} href="/recipe/create">
          Profile
        </Link>
      </div>
    </nav>
  );
}