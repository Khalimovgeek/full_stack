import api from "./axios";

export const getProfile = async () => {
  const res = await api.get("profile/");
  return res.data;
};
