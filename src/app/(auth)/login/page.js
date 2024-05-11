"use client";

import Link from "next/link";
import Image from "next/image";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/auth";
import { Button } from "@/components/ui/button";
import InputGroup from "@/components/InputGroup";
import styles from "./signIn.module.css";

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
    number: "",
    password: "",
  });
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
            <Image
              src="/logo_latin.png"
              alt="logo"
              fill
              className={styles.img}
            />
          </div>
          <form
            // onSubmit={onSubmit}
            className="w-full md:w-1/2 p-10 bg-white border border-gray-200 shadow rounded-xl"
          >
            <h1 className="text-4xl font-bold mb-10">Sign In</h1>
            <div className="flex flex-col gap-4">
              <InputGroup
                title="Phone Number"
                id="phone"
                type="text"
                onChange={onChange}
                placeholder="Enter Phone Number"
                isRequired={true}
              />
              <InputGroup
                title="Password"
                id="password"
                type="password"
                onChange={onChange}
                placeholder="********"
                isRequired={true}
              />
              <Button type="submit">Sign In</Button>
              <div className="flex justify-center mt-6">
                <p>
                  Don't have Account?{" "}
                  <Link href="sign-up" className="hover:underline">
                    Sign Up
                  </Link>
                </p>
              </div>
              <div className="flex w-full items-center justify-center gap-2">
                <div className="w-[140px] border-b-[1px] border-[#d9d9d9]"></div>
                <h1>Sign In With</h1>
                <div className="w-[140px] border-b-[1px] border-[#d9d9d9]"></div>
              </div>
              <div className="flex w-full justify-center gap-10">
                <a href="#">
                  <img alt="fb" className="h-[40px] w-[40px]" />
                </a>
                <a href="https://api.tarang.site/auth/google/redirect">
                  <img alt="google" className="h-[40px] w-[40px]" />
                </a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
