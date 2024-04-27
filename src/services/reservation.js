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

export const getReservation = async () => {
  try {
    const res = await axios.get("https://api.tarang.site/api/reservation", {
      headers: {
        "content-type": "multipart/form-data",
        Accept: "application/json",
        Referer: "https://tarang.site",
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return error.res;
  }
};

export const updateReservation = async (updateReservation, reservationId) => {
  try {
    const res = await axios.put(
      `https://api.tarang.site/api/reservation/${reservationId}`,
      updateReservation,
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
    return error.res;
  }
};

export const deleteReservation = async (reservationId) => {
  try {
    const res = await axios.delete(
      `https://api.tarang.site/api/reservation/${reservationId}`,
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
    return error.res;
  }
};
