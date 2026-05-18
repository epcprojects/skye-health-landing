import FooterInner from "@/app/components/layouts/FooterInner";
import Header from "@/app/components/layouts/Header";
export default function InnerPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
     <Header />
      {/* <HeaderInner /> */}
      <main className="flex-1">{children}</main>
      <FooterInner />
    </>
  );
}
