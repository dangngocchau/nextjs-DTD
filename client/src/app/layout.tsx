import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import AppProvider from "./AppProvider";
import { cookies } from "next/headers";
const inter = Inter({ subsets: ["vietnamese"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesStore = cookies();
  const sessionToken = cookiesStore.get("sessionToken");

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider initialSessionToken={sessionToken?.value}>
            <Header />
            {children}
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
