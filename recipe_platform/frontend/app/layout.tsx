import { getServerSession } from "next-auth";
import Navigation from "./components/Navigation";
import "./globals.css";
import Provider from "./login/Provider";

import styles from "./styles/Layout.module.css";
import { authOptions } from "@/lib/authOptions";
import LoggedInClient from "./login/loggedIn/LoggedInClient";
import LoggedInServer from "./login/loggedIn/LoggedInServer";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={styles.body}>
        <Provider session={session}>
          <header>
            <Navigation />
          </header>
          <div>
            <LoggedInClient />
            <LoggedInServer />
          </div>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
