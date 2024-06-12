import { Poppins } from "next/font/google";
import "./global.css";
import ReactQueryProvider from "@/lib/Providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "Tarang",
  description:
    "Join Tarang to find a team to compete against. Discover venues to reserved for your matches and immerse yourself in the world of sport.",
  keywords:
    "Tarang, Tarang Cambodia, Tarang Football, Tarang Badminton, Tarang Volleyball, Tarang Ping Pong, Tarang Best Sport Venue Reservation Website In Cambodia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
