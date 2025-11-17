
export default function AuthFormCard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-card justify-center items-center p-16 shadow-lg rounded-3xl stroke-stroke border border-stroke">
        {children}
    </div>
  );
}