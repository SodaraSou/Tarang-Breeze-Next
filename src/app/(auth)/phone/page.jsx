"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import InputGroup from "@/components/InputGroup";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
function PhonePage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  console.log(value);
  const router = useRouter();
  const handleUpdatePhone = async (e) => {
    e.preventDefault();
    try {
      if (phoneNumber.startsWith("+")) {
        setPhoneNumber(phoneNumber.slice(1));
      }
      await axios.post(
        "http://localhost:8000/api/user/phone",
        { phone: phoneNumber },
        {
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
          },
        }
      );
      setOpen(true);
    } catch (e) {
      console.log(e.response);
    }
  };
  const handleOpt = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/user/phone/verify",
        { code: parseInt(value) },
        {
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
          },
        }
      );
      router.push("/");
      console.log(res);
    } catch (e) {
      alert(e);
      console.log(e.response);
      return e.response;
    }
  };
  return (
    <section className="h-screen flex flex-col justify-center items-center p-4 xl:p-0">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-4xl">OTP</DialogTitle>
            <DialogDescription>
              Enter the 6 digit code sent to your phone number {phoneNumber}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={value}
              onChange={(value) => setValue(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <DialogFooter>
            <Button
              onClick={handleOpt}
              type="submit"
              variant="outline"
              className="bg-[#2ad5a5] text-white"
            >
              Verify
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Card className="w-full max-w-[500px] bg-white">
        <CardHeader>
          <CardTitle>Enter Phone Number</CardTitle>
          <CardDescription>We required your phone number</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Label>Phone Number</Label>
            <PhoneInput
              id="phone"
              onChange={setPhoneNumber}
              className="rounded-lg"
              international
              defaultCountry="KH"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleUpdatePhone}
            type="submit"
            variant="outline"
            className="w-full bg-[#2ad5a5] text-white"
          >
            Send OTP
          </Button>
        </CardFooter>
      </Card>
      {/* <div className="w-full md:max-w-5xl flex">
        <div
          className={`hidden w-full md:w-1/2 md:block ${styles.imgContainer}`}
        >
          <Link href="/">
            <Image
              src="/logo_latin.png"
              alt="logo"
              fill
              className={styles.img}
            />
          </Link>
        </div>
        <Card className="w-full md:w-1/2 bg-white">
          <CardHeader>
            <CardTitle className="text-2xl md:text-4xl">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <Label>Phone Number</Label>
                <PhoneInput
                  id="phone"
                  onChange={setPhoneNumber}
                  className="rounded-lg"
                  international
                  defaultCountry="KH"
                />
              </div>
              <InputGroup
                title="Password"
                id="password"
                type="password"
                onChange={onChange}
                placeholder="********"
                isRequired={true}
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col justify-center gap-4">
            <Button
              onClick={onSubmit}
              type="submit"
              variant="outline"
              className="w-full bg-[#2ad5a5] hover:bg-[#9c87f2] text-white hover:text-white"
            >
              Sign In
            </Button>
            <p>
              Don't have Account?{" "}
              <Link href="/register" className="underline">
                Sign Up
              </Link>
            </p>
            <div className="flex w-full justify-center gap-10">
              <a href="#">
                <Image
                  src="/facebook.png"
                  alt="facebook_logo"
                  width={30}
                  height={30}
                />
              </a>
              <a href="http://localhost:8000/auth/google/redirect">
                <Image
                  src="/google.png"
                  alt="google_logo"
                  width={30}
                  height={30}
                />
              </a>
            </div>
          </CardFooter>
        </Card>
      </div> */}
    </section>
  );
}

export default PhonePage;
