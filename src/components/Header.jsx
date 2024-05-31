import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Header() {
  return (
    <header className="w-full bg-white">
      <div className="p-4 flex justify-between items-center">
        <div className="md:w-1/4">
          <Link href="/">
            <Image src="/tarang_logo.png" alt="logo" width={150} height={50} />
          </Link>
        </div>
        <nav className="hidden xl:flex justify-center gap-10">
          <Link href="/sport/football">Football</Link>
          <Link href="/sport/badminton">Badminton</Link>
          <Link href="/sport/volleyball">Volleyball</Link>
          <Link href="/sport/ping%20pong">Ping Pong</Link>
          <Link href="/about-us">About Us</Link>
        </nav>
        <div className="md:w-1/4 flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default Header;
