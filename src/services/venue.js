import axios from "@/lib/axios";
import { deleteVenueImg, uploadVenueImg } from "@/lib/firebase/storage";

export const createVenue = async (venue) => {
  console.log(venue);
  try {
    const imgUrl = await uploadVenueImg(venue.name, venue.photo);
    const res = await axios.post(
      "https://api.tarang.site/api/venues",
      { ...venue, photo: imgUrl },
      {
        headers: {
          "content-type": "application/json",
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

export const getVenues = async () => {
  try {
    const res = await axios.get("https://api.tarang.site/api/venues", {
      headers: {
        Accept: "application/json",
        Referer: "https://tarang.site",
      },
    });
    const data = res.data;
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

export const showSingleVenue = async (venueId) => {
  try {
    const res = await axios.get(
      `https://api.tarang.site/api/venues/${venueId}`,
      {
        headers: {
          Accept: "application/json",
          Referer: "https://tarang.site",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteVenue = async (venue) => {
  try {
    await deleteVenueImg(venue.name);
    const response = await axios.delete(
      `https://api.tarang.site/api/venues/${venue.id}`,
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
};

export const updateVenue = async (venueId, updateVenue) => {
  try {
    const newImgUrl = await uploadVenueImg(updateVenue.name, updateVenue.photo);
    const response = await axios.put(
      `https://api.tarang.site/api/venues/${venueId}`,
      { ...updateVenue, photo: newImgUrl },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
