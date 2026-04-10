import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const bpmfIansui = localFont({
  src: "../public/fonts/BpmfIansui-Regular.ttf",
  variable: "--font-bpmf-iansui",
});

export const metadata: Metadata = {
  title: {
    default: "ReadlyMagic | The Science of Reading",
    template: "%s | ReadlyMagic",
  },
  description:
    "ReadlyMagic uses the science of reading to help students master literacy through engaging, magic-themed passages and resources.",
  keywords: [
    "reading",
    "literacy",
    "science of reading",
    "education",
    "student learning",
  ],
};

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bpmfIansui.variable} font-serif antialiased`}>
        {children}
        <Script 
          src="https://code.responsivevoice.org/responsivevoice.js?key=f07Z2Y46" 
          strategy="afterInteractive" 
        />
      </body>
    </html>
  );
}
