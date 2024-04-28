import axios from "@/lib/axios";

axios.defaults.withXSRFToken = true;
axios.defaults.withCredentials = true;

export const getUsers = async () => {
  try {
    const res = await axios.get("https://api.tarang.site/api/users", {
      headers: {
        Accept: "application/json",
        Referer: "https://tarang.site",
      },
    });
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};