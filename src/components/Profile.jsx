"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/user";
import { useAuth } from "@/hooks/auth";
import { FaPenToSquare } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";

function Profile() {
  const { logout } = useAuth();
  const { data } = useQuery({
    queryFn: getUser,
    queryKey: ["users"],
  });
  const [editMode, setEditMode] = useState(true);
  return (
    <Card className="bg-white">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl md:text-4xl">Profile</CardTitle>
          <Button
            onClick={logout}
            variant="outline"
            className="bg-red-500 hover:bg-red-700 text-white hover:text-white"
          >
            Log Out
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full flex flex-col md:flex-row justify-between gap-4 md:gap-10">
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="relative inline-block">
              <label
                htmlFor="fileInput"
                //   className={!editMode ? `cursor-pointer` : ""}
              >
                <img
                  src={"https://github.com/shadcn.png"}
                  alt="Profile Image"
                  className="rounded-full w-40 h-32 object-cover"
                />
              </label>
              <input
                id="fileInput"
                type="file"
                className="hidden"
                // onChange={onImgUrlChange}
                // disabled={editMode}
              />
            </div>
            <button
              // onClick={onSubmit}
              className="text-lg flex items-center gap-2"
            >
              {editMode ? (
                <>
                  <FaPenToSquare />
                  Edit
                </>
              ) : (
                <>
                  <FaSave /> Save
                </>
              )}
            </button>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <Label>Name</Label>
              <Input
                id="name"
                type="text"
                defaultValue={data?.data.name}
                disabled
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label>Phone Number</Label>
              <PhoneInput
                placeholder="Enter a phone number"
                className="rounded-lg"
                international
                defaultCountry="KH"
                disabled
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Profile;
