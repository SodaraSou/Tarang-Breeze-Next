"use client";

import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

function PhonePage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOptLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  useEffect(() => {
    if (openToast) {
      toast({
        variant: "destructive",
        description: message,
      });
    }
  }, [openToast, toast, message]);
  const handleUpdatePhone = async (e) => {
    e.preventDefault();
    setOpenToast(false);
    setMessage("");
    if (phoneNumber === "") {
      setMessage("Phone Number is required.");
      setOpenToast(true);
      return;
    }
    if (phoneNumber.startsWith("+")) {
      setPhoneNumber(phoneNumber.slice(1))
    }
    setLoading(true);
    try {
      if (phoneNumber.startsWith("+")) {
        setPhoneNumber(phoneNumber.slice(1));
      }
      await axios.post(
        "https://api.tarang.site/api/provider/phone",
        { phone: phoneNumber },
        {
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
          },
        }
      );
      setOpen(true);
    } catch (e) {
      console.log(e.response);
      setMessage(e.response.data.message);
      setOpenToast(true);
    } finally {
      setLoading(false);
    }
  };
  const handleOpt = async (e) => {
    e.preventDefault();
    setOpenToast(false);
    setMessage("");
    if (value === "") {
      setMessage("Fill out the OTP.");
      setOpenToast(true);
      return;
    }
    if (value.length !== 6) {
      setMessage("Requrird all 6 pins.");
      setOpenToast(true);
      return;
    }
    setOptLoading(true);
    try {
      await axios.post(
        "https://api.tarang.site/api/user/phone/verify",
        { code: parseInt(value) },
        {
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
          },
        }
      );
      router.push("/");
    } catch (e) {
      console.log(e.response);
      setMessage(e.response.data.message);
      setOpenToast(true);
      return e.response;
    } finally {
      setOptLoading(false);
    }
  };
  return (
    <section className="h-screen flex flex-col justify-center items-center p-4 xl:p-0">
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
              className="bg-[#2ad5a5] text-white"
              disabled={otpLoading}
            >
              {otpLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Verify
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Card className="w-full max-w-[500px] bg-white">
        <CardHeader>
          <CardTitle>Enter Phone Number</CardTitle>
          <CardDescription>We required your phone number</CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleUpdatePhone}
            type="submit"
            variant="outline"
            className="w-full bg-[#2ad5a5] text-white"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send OTP
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}

export default PhonePage;
