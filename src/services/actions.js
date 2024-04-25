"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function register(prevState, formData) {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
  };

  const res = await fetch("http://api.attendance-sys.me/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const msg = await res.json();
    console.log(msg);
    return { message: msg.errors };
  }

  // const resData = await res.json();

  // cookies().set("token", resData.access_token, {
  //   secure: process.env.NODE_ENV === "production",
  //   httpOnly: true,
  // });
  redirect("/");
}

export async function login(prevState, formData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const res = await fetch("http://api.attendance-sys.me/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const msg = await res.json();
    console.log(msg);
    return { message: msg.errors };
  }

  const resData = await res.json();

  cookies().set("token", resData.access_token, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });
  redirect("/");
}
