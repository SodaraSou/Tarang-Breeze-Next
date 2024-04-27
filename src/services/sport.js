import axios from "@/lib/axios";

axios.defaults.withXSRFToken = true;
axios.defaults.withCredentials = true;

export const getSportTypes = async () => {
  try {
    const res = await axios.get("https://api.tarang.site/api/sport-types", {
      headers: {
        Accept: "application/json",
        Referer: "https://tarang.site",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
