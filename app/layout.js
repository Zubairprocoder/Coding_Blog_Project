import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";
import { AuthContextProvider } from "@/lib/contexts/AuthContext";
import { ModeToggle } from "@/components/ModeToggle";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/lib/contexts/UserContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Talokar Coding Academy - Learn Full Stack Development",
  description:
    "Talokar Coding Academy offers tutorials, roadmaps, and projects for Frontend, Backend, and Full Stack Development with modern web technologies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthContextProvider>
            <UserProvider>
              <Navbar /> {/* Navbar now has access to AuthContext */}
              <div className="fixed bottom-5 right-5 z-100">
                <ModeToggle />
              </div>
              <main className="max-w-7xl mx-auto">{children}</main>
              <Toaster position="top-center" />
            </UserProvider>
          </AuthContextProvider>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

