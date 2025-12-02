import Header from "@/components/header";
import "../globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="flex flex-col w-full h-screen">
        <Header />
        {children}
      </div>
  );
}
