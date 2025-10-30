import { instance } from "../config/instance"; // shu faylni alohida saqlagan edik

export const getScheduleByDate = (date) => {
  return instance.get(`/admin/schedule/${date}`);
};

export const addToSchedule = (data) => {
  // data = { date, foodId, category }
  return instance.post("/admin/schedule", data);
};

export const removeFromSchedule = (id) => {
  return instance.delete(`/admin/schedule/${id}`);
};
