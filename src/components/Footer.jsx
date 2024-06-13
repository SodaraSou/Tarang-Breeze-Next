import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Copyright } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-white border-t bg-muted/40 mt-10">
      <div className="max-w-7xl mx-auto p-4 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-10">
          <div className="flex flex-col gap-4">
            <Link href="/">
              <Image
                src="/tarang_logo.png"
                alt="logo"
                width={150}
                height={50}
              />
            </Link>
            <p className="text-sm">
              Tarang - Discover venues to reserved for your matches and immerse
              yourself in the world of sport.
            </p>
          </div>
          <div className="xl:ml-10">
            <h2 className="font-bold mb-4">Sport</h2>
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <Link href="/sport/football">Football</Link>
              </li>
              <li>
                <Link href="/sport/badminton">Badminton</Link>
              </li>
              <li>
                <Link href="/sport/volleyball">Volleyball</Link>
              </li>
              <li>
                <Link href="/sport/ping%20pong">Ping Pong</Link>
              </li>
            </ul>
          </div>
          <div className="xl:ml-10">
            <h2 className="font-bold mb-4">Tarang</h2>
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <Link href="/about-us">About Us</Link>
              </li>
              <li>
                <Link href="/">Careers</Link>
              </li>
              <li>
                <Link href="/">Community</Link>
              </li>
              <li>
                <Link href="/">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold mb-4">Contact & Address</h2>
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <p>+855 12 354 987</p>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <p>contact@tarang.site</p>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <div>
                    <p>Russian Federation Boulevard,</p>
                    <p>Toul Kork, Phnom Penh.</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-gray-200 h-0.5 my-4 md:my-10"></div>
        <div className="flex flex-col gap-4 lg:flex-row justify-between items-center text-sm font-semibold">
          <div className="flex items-center gap-2">
            <Copyright className="w-4 h-4" />
            <p>2024 Tarang - All rights reserved</p>
          </div>
          <div>
            <ul className="flex items-center gap-4">
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Tarang Policy</li>
            </ul>
          </div>
          <div>
            <ul className="flex items-center gap-4">
              <li>
                <Image
                  src="/facebook.png"
                  alt="facebook"
                  width={24}
                  height={24}
                />
              </li>
              <li>
                <Image
                  src="/telegram.png"
                  alt="facebook"
                  width={24}
                  height={24}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
