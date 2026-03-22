import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "MyBCAT HubSpot Cleaner — Sales Funnel System",
  description:
    "Visual presentation of the MyBCAT HubSpot Cleaner sales funnel system — 8-stage classification engine for 13,000+ contacts across US optometry practices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-950 text-gray-100 min-h-screen">
        <Navigation />
        <main className="lg:ml-64 min-h-screen">
          <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
