import { Footer, FooterInner, Header, HeaderInner } from "@/app/components";

export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderInner/>
      <main className="flex-1">{children}</main>
      <FooterInner/>
    </>
  );
}
