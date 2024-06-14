"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/user";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "./ui/separator";

function Header() {
  const { data } = useQuery({
    queryFn: getUser,
    queryKey: ["users"],
  });
  const pathName = usePathname();
  return (
    <header className="w-full bg-white">
      <div className="p-4 flex justify-between items-center">
        <div className="md:w-1/4">
          <Link href="/">
            <Image src="/tarang_logo.png" alt="logo" width={150} height={50} />
          </Link>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 xl:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="flex flex-col gap-6 max-w-[250px] sm:max-w-[250px]"
          >
            <Link href="/">
              <Image
                src="/tarang_logo.png"
                alt="logo"
                width={150}
                height={50}
                className="mx-auto"
              />
            </Link>
            <nav className="grid gap-2 text-lg font-semibold">
              {data?.status !== 401 ? (
                <Link href="/user" className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={
                        data?.data.photo
                          ? data?.data.photo
                          : "https://github.com/shadcn.png"
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <h3 className="text-sm">My Account</h3>
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login" className="w-full" asChild>
                    <Button
                      className="w-full bg-[#2ad5a5] text-white"
                      variant="outline"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Separator orientation="vertical" />
                  <Link href="/register" className="w-full" asChild>
                    <Button
                      className="w-full bg-[#9c87f2] text-white"
                      variant="outline"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
              <Link
                href="/sport/football"
                className={
                  pathName === "/sport/football"
                    ? "mx-[-0.65rem] bg-[#f5f5f5] flex items-center gap-4 rounded-lg px-3 py-2"
                    : "flex items-center gap-4 rounded-lg py-2 text-gray-400 transition-all hover:text-black"
                }
              >
                Football
              </Link>
              <Link
                href="/sport/badminton"
                className={
                  pathName === "/sport/badminton"
                    ? "mx-[-0.65rem] bg-[#f5f5f5] flex items-center gap-4 rounded-lg px-3 py-2"
                    : "flex items-center gap-4 rounded-lg py-2 text-gray-400 transition-all hover:text-black"
                }
              >
                Badminton
              </Link>
              <Link
                href="/sport/volleyball"
                className={
                  pathName === "/sport/volleyball"
                    ? "mx-[-0.65rem] bg-[#f5f5f5] flex items-center gap-4 rounded-lg px-3 py-2"
                    : "flex items-center gap-4 rounded-lg py-2 text-gray-400 transition-all hover:text-black"
                }
              >
                Volleyball
              </Link>
              <Link
                href="/sport/ping-pong"
                className={
                  pathName === "/sport/ping-pong"
                    ? "mx-[-0.65rem] bg-[#f5f5f5] flex items-center gap-4 rounded-lg px-3 py-2"
                    : "flex items-center gap-4 rounded-lg py-2 text-gray-400 transition-all hover:text-black"
                }
              >
                Ping Pong
              </Link>
              <Link
                href="/about-us"
                className={
                  pathName === "/about-us"
                    ? "mx-[-0.65rem] bg-[#f5f5f5] flex items-center gap-4 rounded-lg px-3 py-2"
                    : "flex items-center gap-4 rounded-lg py-2 text-gray-400 transition-all hover:text-black"
                }
              >
                About Us
              </Link>
              <Link
                href="/policy"
                className={
                  pathName === "/policy"
                    ? "mx-[-0.65rem] bg-[#f5f5f5] flex items-center gap-4 rounded-lg px-3 py-2"
                    : "flex items-center gap-4 rounded-lg py-2 text-gray-400 transition-all hover:text-black"
                }
              >
                Policy
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <nav className="hidden xl:flex justify-center gap-10 font-semibold">
          <Link
            href="/sport/football"
            className={
              pathName === "/sport/football"
                ? "text-black"
                : "text-gray-400 transition-all hover:text-black"
            }
          >
            Football
          </Link>
          <Link
            href="/sport/badminton"
            className={
              pathName === "/sport/badminton"
                ? "text-black"
                : "text-gray-400 transition-all hover:text-black"
            }
          >
            Badminton
          </Link>
          <Link
            href="/sport/volleyball"
            className={
              pathName === "/sport/volleyball"
                ? "text-black"
                : "text-gray-400 transition-all hover:text-black"
            }
          >
            Volleyball
          </Link>
          <Link
            href="/sport/ping-pong"
            className={
              pathName === "/sport/ping-pong"
                ? "text-black"
                : "text-gray-400 transition-all hover:text-black"
            }
          >
            Ping Pong
          </Link>
          <Link
            href="/about-us"
            className={
              pathName === "/about-us"
                ? "text-black"
                : "text-gray-400 transition-all hover:text-black"
            }
          >
            About Us
          </Link>
          <Link
            href="/policy"
            className={
              pathName === "/policy"
                ? "text-black"
                : "text-gray-400 transition-all hover:text-black"
            }
          >
            Policy
          </Link>
        </nav>
        <div className="md:w-1/4 hidden xl:flex justify-end">
          {data?.status === 401 ? (
            <div className="flex items-center gap-2">
              <Link href="/login" className="w-full" asChild>
                <Button
                  className="w-full bg-[#2ad5a5] text-white"
                  variant="outline"
                >
                  Sign In
                </Button>
              </Link>
              <Separator orientation="vertical" />
              <Link href="/register" className="w-full" asChild>
                <Button
                  className="w-full bg-[#9c87f2] text-white"
                  variant="outline"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <Link href="/user" className="flex items-center gap-4">
              <Avatar>
                <AvatarImage
                  src={
                    data?.data.photo
                      ? data?.data.photo
                      : "https://github.com/shadcn.png"
                  }
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {/* <h3 className="text-sm font-semibold">{data?.data.name}</h3> */}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
