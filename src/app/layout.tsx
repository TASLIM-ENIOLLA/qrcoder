import "@/css/globals.css";
import { Toaster } from "sonner";

export default function Layout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          expand
          richColors
          closeButton
          visibleToasts={3}
          position="bottom-right"
        />
      </body>
    </html>
  );
}

export const metadata = {
  title: "QR Coder App by Taslim Eniolla",
  description: "A simple and efficient QR code generator and decoder application",
};