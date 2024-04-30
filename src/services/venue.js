import axios from "@/lib/axios";
import {
  deleteVenueImg,
  updateVenueImg,
  uploadVenueImg,
} from "@/lib/firebase/storage";

export const createVenue = async (venue) => {
  try {
    const venueId = await axios.post(
      "https://api.tarang.site/api/venues",
      { ...venue, photo: "" },
      {
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const imgUrl = await uploadVenueImg(venueId.data.id, venue.photo);
    const res = axios.put(
      `https://api.tarang.site/api/venues/${venueId.data.id}`,
      {
        ...venue,
        photo: imgUrl,
      },
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
    await deleteVenueImg(venue.id);
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

export const updateVenue = async (venue, updateVenue) => {
  try {
    let newImgUrl = "";
    if (venue.photo !== updateVenue.photo) {
      newImgUrl = await updateVenueImg(venue.id, updateVenue.photo);
    }
    updateVenue.photo = newImgUrl ? newImgUrl : venue.photo;
    const response = await axios.put(
      `https://api.tarang.site/api/venues/${venue.id}`,
      updateVenue,
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
