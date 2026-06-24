export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="lg:grid lg:grid-cols-2 h-screen">
      {/* Left section in desktop version */}
      <section className="hidden lg:block bg-white">
        Left section placeholder
      </section>
      <section className="bg-[#0c0d11] flex justify-center items-center">
        {children}
      </section>
    </div>
  );
}
