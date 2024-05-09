"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/user";
import Spinner from "./Spinner";

function UserProtectedRoute({ children }) {
  const { data, isLoading } = useQuery({
    queryFn: getUser,
    queryKey: ["users"],
  });
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (data?.status === 401) {
    router.push("/login");
  }
  
  return <>{children}</>;
}

export default UserProtectedRoute;
