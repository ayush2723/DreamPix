import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/shared/ThemeContext";

import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta'
});

export const metadata: Metadata = {
  title: "DreamPix",
  description: "AI-powered image generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      variables: { 
        colorPrimary: '#6366f1',
        fontFamily: 'var(--font-plus-jakarta)',
        borderRadius: '12px'
      },
      elements: {
        card: "cl-card",
        headerTitle: "cl-headerTitle",
        headerSubtitle: "cl-headerSubtitle",
        socialButtonsIconButton: "cl-socialButtonsIconButton",
        formButtonPrimary: "cl-formButtonPrimary",
        formFieldInput: "cl-formFieldInput",
        footerActionLink: "text-primary-indigo hover:text-accent-violet transition-colors duration-200",
        userButtonBox: "cl-userButtonBox",
        userButtonOuterIdentifier: "cl-userButtonOuterIdentifier"
      }
    }}>
      <html lang="en" suppressHydrationWarning>
        <head>
          <script dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var storedTheme = localStorage.getItem('theme');
                  var theme = storedTheme;
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `
          }} />
        </head>
        <body className={cn("font-PlusJakarta antialiased", plusJakarta.variable)}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
