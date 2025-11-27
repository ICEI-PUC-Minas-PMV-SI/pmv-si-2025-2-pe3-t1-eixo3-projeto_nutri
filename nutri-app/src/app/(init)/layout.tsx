import Header from "@/components/header";
import "../globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="w-full h-[100vh]">
        <Header />
        {children}
      </div>
  );
}
