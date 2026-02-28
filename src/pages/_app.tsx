import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Sen } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";

const sen = Sen({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <div className={sen.className}>
        <Component {...pageProps} />
      </div>
    </LanguageProvider>
  );
}
