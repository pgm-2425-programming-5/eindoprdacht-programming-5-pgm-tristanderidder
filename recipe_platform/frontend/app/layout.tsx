import Navigation from "./components/Navigation";
import "./globals.css";

import styles from "./styles/Layout.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <header>
          <Navigation />
        </header>
        {children}
      </body>
    </html>
  );
}
