import useSWR from "swr";
import axios from "@/lib/axios";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const router = useRouter();
  const params = useParams();

  const { data: user, error, mutate } = useSWR("/api/user", () =>
    axios
      .get("/api/user")
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error.response;

        router.push("/verify-email");
      })
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const register = async ({ setErrors, ...props }) => {
    await csrf();

    setErrors([]);

    axios
      .post("/register", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const login = async ({ setErrors, setStatus, ...props }) => {
    await csrf();
    // setErrors([]);
    // setStatus(null);

    // axios
    //   .post("/login", props)
    //   .then(() => mutate())
    //   .catch((error) => {
    //     if (error.response.status !== 422) throw error;
    //     return error.response;
    //     // setErrors(error.response.data.errors);
    //   });
    try {
      const response = await axios.post("/login", props);
      mutate(); // Assuming mutate() does not need to await or handle its promise here
      return response;
    } catch (error) {
      if (error.response && error.response.status !== 422) {
        throw error; // Rethrow the error if it's not a 422 status
      }
      // Optionally, you can uncomment and use these if needed
      // setErrors(error.response.data.errors);
      // setStatus('error');
      return error.response; // Return the error response
    }
  };

  const forgotPassword = async ({ setErrors, setStatus, email }) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/forgot-password", { email })
      .then((response) => setStatus(response.data.status))
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resetPassword = async ({ setErrors, setStatus, ...props }) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/reset-password", { token: params.token, ...props })
      .then((response) =>
        router.push("/login?reset=" + btoa(response.data.status))
      )
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resendEmailVerification = ({ setStatus }) => {
    axios
      .post("/email/verification-notification")
      .then((response) => setStatus(response.data.status));
  };

  const logout = async () => {
    if (!error) {
      await axios.post("/logout").then(() => mutate());
    }

    window.location.pathname = "/login";
  };

  useEffect(() => {
    if ((user && user?.is_admin === false) || (user && user?.is_admin === true))
      router.push("/user");
    // if (user && user?.is_admin === 1) router.push("/admin");
    // if (window.location.pathname === "/verify-email" && user?.email_verified_at)
    //   router.push(redirectIfAuthenticated);
    if (middleware === "auth" && error) logout();
  }, [user, error]);

  return {
    user,
    error,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  };
};
