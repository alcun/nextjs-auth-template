import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Auth Template",
  description: "Production-ready Next.js with Better Auth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
