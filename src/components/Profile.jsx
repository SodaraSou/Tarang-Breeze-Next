"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/user";
import { useAuth } from "@/hooks/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { useToast } from "@/components/ui/use-toast";
import Spinner from "./Spinner";

function Profile() {
  const { logout } = useAuth();
  const { data, isLoading } = useQuery({
    queryFn: getUser,
    queryKey: ["users"],
  });
  const [editMode, setEditMode] = useState(true);
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [inputData, setInputData] = useState({
    name: "",
    phone: "",
    photo: "",
  });
  useEffect(() => {
    if (data) {
      setInputData((prev) => ({
        ...prev,
        name: data.data.name,
        phone: data.data.phone,
        photo: data.data.photo || prev.photo,
      }));
    }
  }, [data]);
  useEffect(() => {
    if (image) {
      setInputData((prev) => ({
        ...prev,
        photo: image,
      }));
    }
  }, [image]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  useEffect(() => {
    if (open) {
      toast({
        description: message,
      });
    }
  }, [open, toast]);
  const onImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setImageFile(file);
    }
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    const isNameChanged = inputData.name !== data.data.name;
    const isPhoneChanged = inputData.phone !== data.data.phone;
    const isPhotoChanged = imageFile !== null;

    if (!isNameChanged && !isPhoneChanged && !isPhotoChanged) {
      setMessage("No change made");
      setOpen(true);
      setEditMode(!editMode);
      return;
    }
    setEditMode(!editMode);
  };
  return (
    <>
      <Card className="bg-white">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Accout Details</CardTitle>
            <Button
              onClick={logout}
              variant="outline"
              className="bg-red-500 hover:bg-red-700 text-white hover:text-white"
            >
              Sign Out
            </Button>
          </div>
        </CardHeader>
        {isLoading || loading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <>
            <CardContent>
              <div className="flex flex-col justify-between gap-4 md:gap-10">
                <div className="flex flex-col gap-4 justify-center items-center">
                  <div className="relative inline-block">
                    <label
                      htmlFor="fileInput"
                      className={!editMode ? `cursor-pointer` : ""}
                    >
                      <img
                        src={
                          inputData.photo === ""
                            ? "https://github.com/shadcn.png"
                            : inputData.photo
                        }
                        alt="Profile Image"
                        className="rounded-full w-32 h-32 object-cover"
                      />
                    </label>
                    <input
                      id="fileInput"
                      type="file"
                      className="hidden"
                      onChange={onImageChange}
                      disabled={editMode}
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full flex flex-col gap-4">
                    <Label>Name</Label>
                    <Input
                      id="name"
                      type="text"
                      defaultValue={inputData.name}
                      disabled={editMode}
                    />
                  </div>
                  <div className="w-full flex flex-col gap-4">
                    <Label>Phone Number</Label>
                    <PhoneInput
                      value={data?.data.phone ? "+" + data?.data.phone : ""}
                      placeholder="Enter a phone number"
                      className="rounded-lg"
                      international
                      defaultCountry="KH"
                      disabled={editMode}
                    />
                  </div>
                  {/* <div className="flex items-end">
                    {!editMode ? (
                      <>
                        <Button
                          className="bg-blue-500 hover:bg-blue-700"
                          onClick={handleUpdate}
                        >
                          Save
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          className="bg-blue-500 hover:bg-blue-700"
                          onClick={() => setEditMode(!editMode)}
                        >
                          Edit
                        </Button>
                      </>
                    )}
                  </div> */}
                </div>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </>
  );
}

export default Profile;
