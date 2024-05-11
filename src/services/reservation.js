import axios from "@/lib/axios";

const apiDomain = "http://localhost:8000";

export const createReservation = async (reservation) => {
  try {
    console.log(reservation);
    const res = await axios.post("/api/reservation", reservation, {
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    });
    return res;
  } catch (error) {
    console.error(error.response);
    return error.response;
  }
};

export const updateReservation = async (reservation, updateReservation) => {
  try {
    const res = await axios.put(
      `${apiDomain}/api/reservation/${reservation.id}`,
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
      `${apiDomain}/api/reservation/${reservationId}`,
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
    const res = await axios.get(`${apiDomain}/api/reservation?all`, {
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
    const res = await axios.get(`${apiDomain}/api/reservation`, {
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

export const getReservationByUser = async () => {
  try {
    const res = await axios.get(`/api/reservations-user`, {
      headers: {
        Accept: "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error(error.response);
    return error.response.data;
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
      `${apiDomain}/api/available-time`,
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
