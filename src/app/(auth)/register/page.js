"use client";

import { Button } from "@/components/ui/button";
import InputGroup from "@/components/InputGroup";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import { useState } from "react";
import styles from "./signIn.module.css";
import Image from "next/image";

const Page = () => {
  
  const { register } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/profile",
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);

  const [inputData, setInputData] = useState({
    name: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });

  const onChange = (e) => {
    e.preventDefault();
    setInputData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(inputData);
    axios
      .post("https://api.tarang.site/register", inputData, {
        withCredentials: true,
        withXSRFToken: true,
        headers: {
          Accept: "application/json",
        },
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/");
  };

  const submitForm = (event) => {
    event.preventDefault();

    register({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      setErrors,
    });
  };

  return (
    <section className="h-screen flex flex-col justify-center items-center p-4 xl:p-0">
      <div className="w-full md:max-w-5xl flex">
        <div
          className={`hidden w-full md:w-1/2 md:block ${styles.imgContainer}`}
        >
          <Image src="/logo_latin.png" alt="logo" fill className={styles.img} />
        </div>
        <form
          onSubmit={onSubmit}
          className="w-full md:w-1/2 p-10 bg-white border border-gray-200 shadow rounded-xl"
        >
          <h1 className="text-4xl font-bold mb-10">Sign In</h1>
          <div className="flex flex-col gap-4">
            <InputGroup
              title="Name"
              id="name"
              type="text"
              onChange={onChange}
              placeholder="Enter Name"
              isRequired={true}
            />
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
            <InputGroup
              title="Confirm Password"
              id="password_confirmation"
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
              <a href="http://localhost:8000/auth/google/redirect">
                <img alt="google" className="h-[40px] w-[40px]" />
              </a>
              {/* <Button onClick={handleGoogleLogin}>Google</Button> */}
            </div>
          </div>
        </form>
      </div>
    </section>
    // <div className="flex flex-col items-center gap-10 p-10 xl:px-0">
    //   <div className="max-w-5xl">
    //     <div className="flex h-[540px] w-[960px] gap-4 bg-white">
    //       <div className="flex h-full w-1/2 items-center bg-[#d9d9d9]">
    //         <Image
    //           src="/logo_latin.png"
    //           alt="logo"
    //           fill
    //           className={styles.img}
    //         />
    //       </div>
    //       <form
    //         onSubmit={onSubmit}
    //         className="flex h-full w-1/2 flex-col justify-center gap-4 p-10"
    //       >
    //         <h1 className="text-4xl font-bold">Sign Up</h1>
    //         <Input
    //           id="name"
    //           type="text"
    //           onChange={onChange}
    //           placeholder="Enter Name"
    //           isRequired={true}
    //         />
    //         <Input
    //           id="phone"
    //           type="text"
    //           onChange={onChange}
    //           placeholder="Enter Phone Number"
    //           isRequired={true}
    //         />
    //         <Input
    //           id="password"
    //           type="password"
    //           onChange={onChange}
    //           placeholder="Password"
    //           isRequired={true}
    //         />
    //         <Input
    //           id="password_confirmation"
    //           type="password"
    //           onChange={onChange}
    //           placeholder="Confirm Password"
    //           isRequired={true}
    //         />
    //         <Button type="submit">Sign Up</Button>
    //         <div className="flex justify-center">
    //           <p>
    //             Already have Account?{" "}
    //             <a className="hover:underline" href="/signin">
    //               Sign In
    //             </a>
    //           </p>
    //         </div>
    //         <div className="flex w-full items-center justify-center gap-2">
    //           <div className="w-[140px] border-b-[1px] border-[#d9d9d9]"></div>
    //           <h1>Sign In With</h1>
    //           <div className="w-[140px] border-b-[1px] border-[#d9d9d9]"></div>
    //         </div>
    //         <div className="flex w-full justify-center gap-10">
    //           <Link to="/">
    //             <img alt="fb" className="h-[40px] w-[40px]" />
    //           </Link>
    //           <Link to="https://api.tarang.site/auth/google/redirect">
    //             <img alt="google" className="h-[40px] w-[40px]" />
    //           </Link>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Page;
