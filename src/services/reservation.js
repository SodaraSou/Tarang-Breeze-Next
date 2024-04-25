import axios from "@/lib/axios";

export const createReservation = async (reservation) => {
  try {
    const res = await axios.post(
      "https://api.tarang.site/api/reservation",
      reservation,
      {
        headers: {
          "content-type": "multipart/form-data",
          Accept: "application/json",
          Referer: "https://tarang.site",
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};
