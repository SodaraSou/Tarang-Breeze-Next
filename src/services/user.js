import axios from "@/lib/axios";

export const getUser = async () => {
  try {
    const res = await axios.get("/api/user");
    return res;
  } catch (error) {
    console.error(error.response);
    return error.response;
  }
};
