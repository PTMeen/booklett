import "./globals.css";
import { Nunito } from "next/font/google";
import { Toaster } from "react-hot-toast";

import LoginModal from "./components/modal/LoginModal";
import RegisterModal from "./components/modal/RegisterModal";
import Navbar from "./components/nav/Navbar";
import { getCurrentUser } from "./actions/getCurrentUser";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Booklett",
  description: "Hotel booking app demo",
};

interface Props {
  children: React.ReactNode;
}

async function RootLayout({ children }: Props) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={nunito.className}>
        <Toaster />
        <Navbar currentUser={currentUser} />
        <RegisterModal />
        <LoginModal />
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
