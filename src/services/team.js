import axios from "axios";

axios.defaults.withXSRFToken = true;
axios.defaults.withCredentials = true;

export const getTeam = async () => {
  try {
    const res = await axios.get("https://api.tarang.site/api/teams", {
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

export const createTeam = async (team) => {
  try {
    const { status, data } = await axios.post(
      "https://api.tarang.site/api/teams",
      team,
      {
        headers: {
          "content-type": "multipart/form-data",
          Accept: "application/json",
          Referer: "https://tarang.site",
        },
      },
    );
    return { status, data };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteTeam = async (id) => {
    try {
      const response = await axios.delete(`https://api.tarang.site/api/teams/${id}`,{
        headers: { "content-type": "application/json", Accept: "application/json" },
      });
      console.log(response.status);
      return response;
    } catch(error){
      console.log(error);
      return null
    }
  }