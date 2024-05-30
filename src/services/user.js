import axios from "@/lib/axios";

export const getAllUsers = async () => {
  try {
    const res = await axios.get("/api/users?all", {
      headers: {
        Accept: "application/json",
      },
    });
    return res;
  } catch (error) {
    console.error(error.response);
    return error.response;
  }
};

export const getUser = async () => {
  try {
    const res = await axios.get("/api/user");
    return res;
  } catch (error) {
    console.error(error.response);
    return error.response;
  }
};
