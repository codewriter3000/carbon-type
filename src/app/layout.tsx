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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  // Shrink the layout viewport (and all vh-sized elements) when the soft
  // keyboard opens, instead of overlaying the content. Supported by Chrome
  // on Android 108+; other browsers fall back gracefully.
  interactiveWidget: 'resizes-content',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <Providers>{children}</Providers>
        {process.env.NODE_ENV === 'development' && (
          <div className="dev-watermark" aria-hidden="true">DEV</div>
        )}
      </body>
    </html>
  );
}
