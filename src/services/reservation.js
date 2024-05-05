"use server";

import axios from "@/lib/axios";

export const createReservation = async (reservation) => {
  try {
    const res = await axios.post(
      "https://api.tarang.site/api/reservation",
      reservation,
      {
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateReservation = async (reservation, updateReservation) => {
  try {
    const res = await axios.put(
      `https://api.tarang.site/api/reservation/${reservation.id}`,
      updateReservation,
      {
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
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
          Accept: "application/json",
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    return error.res;
  }
};

export const getReservation = async () => {
  try {
    const res = await axios.get("https://api.tarang.site/api/reservation?all", {
      headers: {
        Accept: "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getReservationWithPagination = async () => {
  try {
    const res = await axios.get("https://api.tarang.site/api/reservation", {
      headers: {
        Accept: "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getReservationWithPaginationPage = async (paginationUrl) => {
  try {
    const res = await axios.get(paginationUrl, {
      headers: {
        Accept: "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAvailableTime = async (date) => {
  try {
    const dateWithoutTime = date.split("T")[0];
    const res = await axios.post(
      "https://api.tarang.site/api/available-time",
      { date: dateWithoutTime },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
