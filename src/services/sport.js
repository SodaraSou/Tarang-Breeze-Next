import axios from "@/lib/axios";

export const getSportTypes = async () => {
  try {
    const response = await axios.get("/api/sport-types", {
      headers: {
        Accept: "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const createSport = async (sport) => {
  try {
    const response = await axios.post("/api/sport-types", sport, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const deleteSport = async (sport) => {
  try {
    const response = await axios.delete(`/api/sport-types/${sport.id}`, {
      headers: {
        Accept: "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const updateSport = async (sport, updateData) => {
  try {
    const response = await axios.put(
      `/api/sport-types/${sport.id}`,
      updateData,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
