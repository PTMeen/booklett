import "./globals.css";
import { Nunito } from "next/font/google";
import { Toaster } from "react-hot-toast";

import LoginModal from "./components/modal/LoginModal";
import RegisterModal from "./components/modal/RegisterModal";
import Navbar from "./components/nav/Navbar";
import { getCurrentUser } from "./actions/getCurrentUser";
import ListingModal from "./components/modal/ListingModal";
import SearchModal from "./components/modal/SearchModal";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

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
      <body className={`${nunito.variable} font-sans`}>
        <Toaster />
        <Navbar currentUser={currentUser} />
        <RegisterModal />
        <LoginModal />
        <ListingModal />
        <SearchModal />
        <div className="pb-20 pt-36">{children}</div>
      </body>
    </html>
  );
}

export default RootLayout;
