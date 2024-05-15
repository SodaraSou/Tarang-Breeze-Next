"use client";

import Link from "next/link";
import Image from "next/image";
import axios from "@/lib/axios";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
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

const Page = () => {
  const [inputData, setInputData] = useState({
    name: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });
  console.log(inputData);
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
      const res = await axios.post(
        "http://localhost:8000/register",
        inputData,
        {
          headers: {
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

  const handleOpt = async (e) => {
    e.preventDefault();
    try {
    } catch (e) {
      console.log(e.response);
      return e.response;
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>OTP</DialogTitle>
            <DialogDescription>
              Enter the 6 digit code sent to your phone number +88570776079
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <InputOTP maxLength={6}>
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
            <Image
              src="/logo_latin.png"
              alt="logo"
              fill
              className={styles.img}
            />
          </div>
          <Card className="w-full md:w-1/2 bg-white">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
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
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    id="phone"
                    onChange={onChange}
                    placeholder="Your Phone Number"
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
                type="submit"
                variant="outline"
                className="w-full bg-[#2ad5a5] hover:bg-[#9c87f2] text-white hover:text-white"
              >
                Sign Up
              </Button>
              <p>
                Don't have Account?{" "}
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
