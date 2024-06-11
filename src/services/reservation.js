import axios from "@/lib/axios";

export const createReservation = async (reservation) => {
  try {
    reservation.date = reservation.date.split("T")[0];
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
      `/api/reservation/${reservation.id}`,
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
    const res = await axios.delete(`/api/reservation/${reservationId}`, {
      headers: {
        Accept: "application/json",
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return error.res;
  }
};

export const getAllReservations = async () => {
  try {
    const res = await axios.get(`/api/reservation?all`, {
      headers: {
        Accept: "application/json",
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const getReservationWithPagination = async (paginationUrl) => {
  try {
    const res = await axios.get(paginationUrl, {
      headers: {
        Accept: "application/json",
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const getReservationByUser = async (paginationUrl) => {
  try {
    const res = await axios.get(paginationUrl, {
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

export const searchAvailableTime = async (data) => {
  try {
    data.date = data.date.split("T")[0];
    data.sport_type_id = parseInt(data.sport_type_id);
    const res = await axios.post("/api/available-time", data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return res;
  } catch (e) {
    console.log(e.response);
    return e.response;
  }
};

export const checkAvailableTime = async (data) => {
  try {
    const res = await axios.post("/api/find-reservation", data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return res;
  } catch (e) {
    console.log(e.response);
    return e.response;
  }
};
