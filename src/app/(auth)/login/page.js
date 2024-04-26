"use client";

// import Input from "@/components/Input";
// import InputError from "@/components/InputError";
// import Label from "@/components/Label";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InputGroup from "@/components/InputGroup";
import Button from "@/components/Button";
import styles from "./signIn.module.css";
import axios from "@/lib/axios";
// import AuthSessionStatus from "@/app/(auth)/AuthSessionStatus";

const Login = () => {
  const router = useRouter();

  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shouldRemember, setShouldRemember] = useState(false);
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (router.reset?.length > 0 && errors.length === 0) {
      setStatus(atob(router.reset));
    } else {
      setStatus(null);
    }
  });

  const [inputData, setInputData] = useState({
    email: "",
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
    login({
      email,
      password,
      remember: shouldRemember,
      setErrors,
      setStatus,
    });
  };
  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    // await axios.get("/sanctum/csrf-cookie");
    router.push("http://127.0.0.1:8000/auth/google/redirect");
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
            onSubmit={onSubmit}
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
                {/* <a href="https://api.tarang.site/auth/google/redirect">
                  <img alt="google" className="h-[40px] w-[40px]" />
                </a> */}
                <Button onClick={handleGoogleLogin}>Google</Button>
              </div>
            </div>
          </form>
        </div>
      </section>
      {/* <AuthSessionStatus className="mb-4" status={status} />
      <form onSubmit={submitForm}>
        <div>
          <Label htmlFor="email">Email</Label>

          <Input
            id="email"
            type="email"
            value={email}
            className="block mt-1 w-full"
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />

          <InputError messages={errors.email} className="mt-2" />
        </div>
        <div className="mt-4">
          <Label htmlFor="password">Password</Label>

          <Input
            id="password"
            type="password"
            value={password}
            className="block mt-1 w-full"
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          <InputError messages={errors.password} className="mt-2" />
        </div>
        <div className="block mt-4">
          <label htmlFor="remember_me" className="inline-flex items-center">
            <input
              id="remember_me"
              type="checkbox"
              name="remember"
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={(e) => setShouldRemember(e.target.checked)}
            />

            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
        </div>

        <div className="flex items-center justify-end mt-4">
          <Link
            href="/forgot-password"
            className="underline text-sm text-gray-600 hover:text-gray-900"
          >
            Forgot your password?
          </Link>

          <Button className="ml-3">Login</Button>
        </div>
      </form> */}
    </>
  );
};

export default Login;
