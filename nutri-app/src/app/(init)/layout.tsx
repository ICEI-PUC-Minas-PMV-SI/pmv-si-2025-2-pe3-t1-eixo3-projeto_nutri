import Header from "@/components/header";
import "../globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="w-full h-full">
        <Header />
        {children}
      </div>
  );
}
