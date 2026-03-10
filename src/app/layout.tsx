import type { Metadata } from "next";
import "./globals.scss";

import { Providers } from './providers';

export const metadata: Metadata = {
  title: "Carbon Type",
  description: "A Word 2010-style document editor built with IBM Carbon components",
  icons: {
    icon: '/icon.svg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
