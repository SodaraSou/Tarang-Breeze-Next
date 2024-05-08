"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";

function ProtectedRoute({ children }) {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  if (loading) {
    return <Spinner fullScreenSpinner={true} />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
