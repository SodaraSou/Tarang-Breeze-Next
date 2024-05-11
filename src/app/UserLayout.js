import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function UserLayout({ children }) {
  return (
    <div className="h-screen">
      <Header />
      <main className="max-w-7xl mx-auto">{children}</main>
      <Footer />
    </div>
  );
}
