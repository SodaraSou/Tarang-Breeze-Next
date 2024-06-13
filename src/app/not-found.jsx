import Image from "next/image";
import Link from "next/link";
import UserLayout from "./UserLayout";
import { Button } from "@/components/ui/button";

function NotFoundPage() {
  return (
    <UserLayout>
      <div className="flex flex-col justify-center items-center gap-6 p-10">
        <div className="flex justify-center items-center gap-2">
          <Image src="/favicon.ico" width={32} height={32} alt="tarang_icon" />
          <h1 className="text-2xl font-semibold">Page Not Found</h1>
        </div>
        <Link href="/">
          <Button variant="outline" className="bg-[#2ad5a5] text-white">
            Back to home
          </Button>
        </Link>
      </div>
    </UserLayout>
  );
}

export default NotFoundPage;
