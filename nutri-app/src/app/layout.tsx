import Header from "@/components/header";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full h-[100vh]">
        <Header />
        {children}
      </body>
    </html>
  );
}
