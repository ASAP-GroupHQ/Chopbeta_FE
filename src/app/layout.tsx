import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

// Configure Raleway to load with your required weights and make it a global CSS variable
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "ChopBeta",
  description: "Generate your personalized meal plan in seconds",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Injecting the variable class into the body binds it globally */}
      <body className={`${raleway.variable} font-sans antialiased bg-[#F8FAFC]`}>
        {children}
      </body>
    </html>
  );
}