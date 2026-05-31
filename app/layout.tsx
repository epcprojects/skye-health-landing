import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { MarqueeCard } from "./components";
import CustomToastContainer from "./components/ToastContainer";
import { StoreProvider } from "./Redux/storeProvider";
import ConsultationPopup from "./components/modals/Popup";
import Image from "next/image";
import { Images } from "./images";
import GraphQLProvider from "./apollo-provider";
import ConstructionGateModal from "./components/modals/ConstructionGateModal";

const Manrope_font = Manrope({
  variable: "--manrope",
  subsets: ["greek"],
});

export const metadata: Metadata = {
  title: "Modern Medicine. Personalized. Delivered.",
  description: "Modern Medicine. Personalized. Delivered.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="favicon/favicon.svg" />
        <link rel="shortcut icon" href="favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="favicon/apple-touch-icon.png"
        />
        <link rel="manifest" href="favicon/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta
          property="og:description"
          content="skye-health delivers clinically-guided peptides,
hormone optimization, and pharmaceutical-grade
vitamins—designed to help you think sharper, recover faster,
feel stronger, and live longer."
        ></meta>
        <meta
          property="og:title"
          content="Modern Medicine.
Personalized. Delivered."
        ></meta>
        <meta
          property="og:image"
          content="https://skye-health.vercel.app/images/paramounthealthrx-og-image.png"
        ></meta>
        <meta property="og:image:width" content="750"></meta>
        <meta property="og:image:height" content="750"></meta>
        <meta
          property="og:url"
          content="https://www.paramounthealthrx.com"
        ></meta>
      </head>
      <body className={`${Manrope_font.variable} antialiased flex flex-col`}>
        {/* <SmoothScroll> */}
        <GraphQLProvider>
          <StoreProvider>
            {children}
            <CustomToastContainer />
            <ConstructionGateModal />
            <ConsultationPopup
              media={
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-[30px]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MarqueeCard />
                  </div>
                  <Image
                    alt="Product"
                    src={Images.landingPage.PeptideTherapy}
                    /* object-contain ensures the image never gets cut off, it just gets smaller */
                    className="relative z-20 w-87.5 h-full object-contain p-4"
                    priority
                  />
                </div>
              }
            />
          </StoreProvider>
        </GraphQLProvider>
        {/* </SmoothScroll> */}
      </body>
    </html>
  );
}
