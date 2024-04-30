import axios from "@/lib/axios";
import { deleteTeamLogo, uploadTeamLogo } from "@/lib/firebase/storage";

export const getTeams = async () => {
  try {
    const res = await axios.get("https://api.tarang.site/api/teams", {
      headers: {
        Accept: "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.res;
  }
};

export const createTeam = async (team) => {
  try {
    const preRes = await axios.post(
      "https://api.tarang.site/api/teams",
      { ...team, logo: "" },
      {
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const logoUrl = await uploadTeamLogo(preRes.data.id, team.logo);
    const res = await axios.put(
      `https://api.tarang.site/api/teams/${preRes.data.id}`,
      { ...team, logo: logoUrl },
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

export const updateTeam = async (team, updateTeam) => {
  try {
    let newLogoUrl = "";
    if (team.logo !== updateTeam.logo) {
      newLogoUrl = await uploadTeamLogo(team.id, updateTeam.logo);
    }
    updateTeam.logo = newLogoUrl ? newLogoUrl : team.logo;
    const res = await axios.put(
      `https://api.tarang.site/api/teams/${team.id}`,
      updateTeam,
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

export const deleteTeam = async (teamId) => {
  try {
    await deleteTeamLogo(teamId);
    const response = await axios.delete(
      `https://api.tarang.site/api/teams/${teamId}`,
      {
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
