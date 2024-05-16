"use client";

import Link from "next/link";
import Image from "next/image";
import axios from "@/lib/axios";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import styles from "./signIn.module.css";
import InputGroup from "@/components/InputGroup";
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
import { PhoneInput } from "@/components/ui/phone-input";
import { useRouter } from "next/navigation";

const Page = () => {
  const [inputData, setInputData] = useState({
    name: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [value, setValue] = useState("");
  const onChange = (e) => {
    e.preventDefault();
    setInputData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (phoneNumber.startsWith("+")) {
        inputData.phone = phoneNumber.slice(1);
      } else {
        inputData.phone = phoneNumber;
      }
      console.log(inputData);
      const res = await axios.post(
        "http://localhost:8000/register",
        inputData,
        {
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
          },
        }
      );
      setUser({ ...res.data });
    } catch (e) {
      console.log(e.response);
    } finally {
      setLoading(false);
      setOpen(true);
    }
  };
  const router = useRouter();
  const handleOpt = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/verify-phone",
        { user_id: user.id, code: value },
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
    <>
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
              className="bg-[#2ad5a5] hover:bg-[#9c87f2] text-white hover:text-white"
            >
              Verify
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <section className="h-screen flex flex-col justify-center items-center p-4 xl:p-0">
        <div className="w-full md:max-w-5xl flex">
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
              <CardTitle className="text-2xl md:text-4xl">Sign Up</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    onChange={onChange}
                    placeholder="Your Name"
                  />
                </div>
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
                <InputGroup
                  title="Confirm Password"
                  id="password_confirmation"
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
                Sign Up
              </Button>
              <p>
                Already have Account?{" "}
                <Link href="/login" className="underline">
                  Sign In
                </Link>
              </p>
              <div className="flex w-full justify-center gap-10">
                <a href="#">
                  <Image
                    src="/facebook.svg"
                    alt="facebook_logo"
                    width={30}
                    height={30}
                  />
                </a>
                <a href="http://localhost:8000/auth/google/redirect">
                  <Image
                    src="/google.svg"
                    alt="google_logo"
                    width={30}
                    height={30}
                  />
                </a>
              </div>
            </CardFooter>
          </Card>
        </div>
      </section>
    </>
  );
};

export default Page;
