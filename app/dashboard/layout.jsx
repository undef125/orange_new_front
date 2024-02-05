import { ChakraProvider } from "@chakra-ui/react";

export default function RootLayout({ children }) {
  return (
    <div className="font-medium">
      <ChakraProvider>{children}</ChakraProvider>
    </div>
  );
}
