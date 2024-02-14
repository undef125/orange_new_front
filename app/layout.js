import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "rsuite/dist/rsuite-no-reset.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import { CustomProvider } from "rsuite";
import { Toaster } from "react-hot-toast";

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
          <Toaster position="top-center" />
          {children}
        </CustomProvider>
      </body>
    </html>
  );
}
