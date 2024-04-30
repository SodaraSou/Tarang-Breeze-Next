import axios from "@/lib/axios";

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

export const createSport = async (sport) => {
  try {
    const res = await axios.post("https://api.tarang.site/api/sport-types", sport ,{
      headers: {
        "Content-Type" : "application/json",
        Accept: "application/json",
        Referer: "https://tarang.site",
      },
    } )
    return res;
  } catch (error){
    console.log(error);
    return error.res;
  }
}

export const deleteSport = async (sport) => {
  try {
    const response = await axios.delete(
      `https://api.tarang.site/api/sport-types/${sport.id}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    console.log(response.status);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const updateSport = async (sport, updateData) => {
  try {
    const res = await axios.put(
      `https://api.tarang.site/api/sport-types/${sport.id}`,updateData,
      {
        headers: {
          "Content-Type" : "application/json",
          Accept: "application/json",
        },
      }
    );
    console.log(res.status);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
}

