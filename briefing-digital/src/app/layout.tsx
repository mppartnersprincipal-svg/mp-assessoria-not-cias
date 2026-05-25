import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../styles/globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Briefing M|P Assessoria",
  description:
    "Briefing digital de onboarding da M|P Assessoria Digital — estratégia que move.",
  authors: [{ name: "M|P Assessoria Digital" }],
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0B1E3A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={jakarta.variable}>
      <body>{children}</body>
    </html>
  );
}
