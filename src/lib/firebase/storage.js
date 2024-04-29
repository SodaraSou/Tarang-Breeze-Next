import { storage } from "./firebase";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
  uploadBytes,
} from "firebase/storage";

export const uploadTeamLogo = async (teamName, image) => {
  const filePath = `team-logo/${teamName}`;
  const newImageRef = ref(storage, filePath);
  const fileUrl = await getDownloadURL(newImageRef).catch(() => null);
  if (fileUrl) {
    await deleteObject(newImageRef);
  }
  await uploadBytesResumable(newImageRef, image);
  return await getDownloadURL(newImageRef);
};

export const uploadUserAvatar = async (user, image) => {
  const filePath = `user-avatar/${user.id}`;
  const newImageRef = ref(storage, filePath);
  const fileUrl = await getDownloadURL(newImageRef).catch(() => null);
  if (fileUrl) {
    await deleteObject(newImageRef);
  }
  await uploadBytesResumable(newImageRef, image);
  return await getDownloadURL(newImageRef);
};

export const uploadVenueImg = async (venueName, image) => {
  try {
    const filePath = `venue-img/${venueName}`;
    const newImageRef = ref(storage, filePath);
    if (image instanceof File) {
      await uploadBytes(newImageRef, image);
      return await getDownloadURL(newImageRef);
    } else {
      deleteObject(newImageRef);
      await uploadBytes(newImageRef, image);
      return await getDownloadURL(newImageRef);
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteVenueImg = async (venueName) => {
  const filePath = `venue-img/${venueName}`;
  const newImageRef = ref(storage, filePath);
  await deleteObject(newImageRef);
};
