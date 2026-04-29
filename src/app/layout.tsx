import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";


export const metadata: Metadata = {
  metadataBase: new URL('https://priyankagusani.com'),
  title: "Priyanka | Sr. WordPress Developer & Automation Specialist",
  description: "Senior WordPress Developer specializing in custom theme development, Shopify Liquid, PHP, and automation solutions. Explore my portfolio and latest blog posts.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Priyanka | Sr. WordPress Developer & Automation Specialist",
    description: "Senior WordPress Developer specializing in custom theme development, Shopify Liquid, PHP, and automation solutions.",
    type: "website",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
        alt: "Priyanka Gusani",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Priyanka | Sr. WordPress Developer & Automation Specialist",
    description: "Senior WordPress Developer specializing in custom theme development, Shopify Liquid, PHP, and automation solutions.",
    images: ["/profile.png"],
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NL4NXKB24B"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NL4NXKB24B');
          `}
        </Script>
      </head>
      <body className="bg-[#0f0f0f] text-[#f5f5f5]">
        {children}
      </body>
    </html>
  );
}

