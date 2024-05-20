import { Poppins } from "next/font/google";
import "./global.css";
import ReactQueryProvider from "@/lib/Providers/ReactQueryProvider";
import Head from "next/head";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "Tarang",
  description:
    "Join Tarang to find a team to compete against. Discover venues to book for your matches and immerse yourself in the world of sport.",
  keywords:
    "Tarang, Tarang Cambodia, Tarang Football, Tarang Badminton, Tarang Volleyball, Tarang Ping Pong, Tarang Best Sport Venue Reservation Website In Cambodia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>
      <body className={poppins.className}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
