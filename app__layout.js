import "./globals.css";
import WebsiteModalProvider from "@/components/WebsiteModalProvider";

export const metadata = {
  title: "Bipin AI — Sab Kuchh, Ek Jagah",
  description:
    "Sarkari jobs, admit card, result aur documents — ek jagah, AI ki madad se.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <WebsiteModalProvider>{children}</WebsiteModalProvider>
      </body>
    </html>
  );
}
