"use client";

import Link from "next/link";
import Image from "next/image";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/auth";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputGroup from "@/components/InputGroup";
import styles from "./signIn.module.css";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";

const Login = () => {
  const { login } = useAuth();

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  useEffect(() => {
    const fetchToken = () => {
      csrf();
    };
    fetchToken();
  }, []);

  const [inputData, setInputData] = useState({
    phone: "",
    password: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const onChange = (e) => {
    e.preventDefault();
    setInputData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    login({});
  };
  return (
    <>
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

export default Login;
