import FooterInner from "@/app/components/layouts/FooterInner";
import HeaderInner from "@/app/components/layouts/HeaderInner";

export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderInner />
      <main className="flex-1">{children}</main>
      <FooterInner />
    </>
  );
}
