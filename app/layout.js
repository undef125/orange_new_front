import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "rsuite/dist/rsuite-no-reset.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import { CustomProvider } from "rsuite";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import { ChakraProvider } from "@chakra-ui/react";
const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Orange Publicity",
  description: "The best store you can have.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <CustomProvider>
          <ChakraProvider>
            <Toaster
              position="top-center"
              showSpinner={false}
              height={10}
              color="#F97316"
              shadow="0 0 10px #2299DD,0 0 5px #F97316"
            />
            <NextTopLoader />
            {children}
          </ChakraProvider>
        </CustomProvider>
      </body>
    </html>
  );
}
