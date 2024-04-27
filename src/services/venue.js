// import axios from "axios";
import axios from "@/lib/axios";

axios.defaults.withXSRFToken = true;
axios.defaults.withCredentials = true;

export const createVenue = async (venue) => {
  try {
    const res = await axios.post("https://api.tarang.site/api/venues", venue, {
      headers: {
        "content-type": "multipart/form-data",
        Accept: "application/json",
        Referer: "https://tarang.site",
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getVenues = async () => {
  try {
    const res = await axios.get("https://api.tarang.site/api/venues", {
      headers: {
        Accept: "application/json",
        Referer: "https://tarang.site",
      },
    });
    const data = res.data;
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getVenuesByType = async (sportType) => {
  try {
    const res = await axios.get(
      `https://api.tarang.site/api/venues?type=${sportType}`,
      {
        headers: {
          Accept: "application/json",
          Referer: "https://tarang.site",
        },
      }
    );
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const showSingleVenue = async (id) => {
  try {
    const res = await axios.get(`https://api.tarang.site/api/venues/${id}`, {
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

export const deleteVenue = async (id) => {
  try {
    const response = await axios.delete(`https://api.tarang.site/api/venues/${id}`,{
      headers: { "content-type": "application/json", Accept: "application/json" },
    });
    console.log(response.status);
    return response;
  } catch(error){
    console.log(error);
    return null
  }
}

export const updateVenue = async (id , venue) => {
  try {
    const response = await axios.post(`https://api.tarang.site/api/venues/${id}?_method=PUT`, venue, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
      },
    });
    const data = response.data;
    console.log(data);
    return data;
  } catch(error) {
    console.log(error);
    return null;
  }
}