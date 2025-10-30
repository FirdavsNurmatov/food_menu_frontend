import { instance } from "../config/instance"; // shu faylni alohida saqlagan edik

export const getScheduleByDate = (date) => {
  return instance.get(`/admin/schedule/${date}`);
};

export const addToSchedule = (date, foodId) => {
  return instance.post(`/admin/schedule`, { date, foodId });
};

export const removeFromSchedule = (id) => {
  return instance.delete(`/admin/schedule/${id}`);
};
