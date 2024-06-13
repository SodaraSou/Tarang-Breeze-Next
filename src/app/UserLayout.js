import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function UserLayout({ children }) {
  return (
    <div className="h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
