"use client";

import Link from "next/link";
import Image from "next/image";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import useSWR from "swr";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const { data: user, error } = useSWR("/api/user", () =>
    axios
      .get("/api/user")
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error.response;
      })
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  useEffect(() => {
    const fetchToken = () => {
      csrf();
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if ((user && user?.is_admin === false) || (user && user?.is_admin === true))
      router.push("/user");
  }, [user, error]);

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
  const [loading, setLoading] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  useEffect(() => {
    if (openToast) {
      toast({
        variant: "destructive",
        description: message,
      });
    }
  }, [openToast, toast, message]);
  const onSubmit = async (e) => {
    e.preventDefault();
    setOpenToast(false);
    setMessage("");
    if (phoneNumber.startsWith("+")) {
      inputData.phone = phoneNumber.slice(1);
    } else {
      inputData.phone = phoneNumber;
    }
    setLoading(true);
    try {
      await axios.post("/login", inputData, {
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
      });
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setMessage(error.response.data.message);
      setOpenToast(true);
    } finally {
      setLoading(false);
    }
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
                onClick={onSubmit}
                type="submit"
                variant="outline"
                className="w-full bg-[#2ad5a5] text-white"
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
              <p>
                Don't have Account?{" "}
                <Link href="/register" className="underline">
                  Sign Up
                </Link>
              </p>
              <div className="flex w-full justify-center gap-10">
                <a href="https://api.tarang.site/auth/facebook/redirect">
                  <Image
                    src="/facebook.png"
                    alt="facebook_logo"
                    width={30}
                    height={30}
                  />
                </a>
                <a href="https://api.tarang.site/auth/google/redirect">
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
        </div>
      </section>
    </>
  );
};

export default Login;
