// src/services/foodService.js
import { instance } from "../config/instance";

// 🍽️ Barcha taomlarni olish
export const getFoods = (category) => instance.get(`/admin${category || ""}`);

// 🍲 Bitta taomni olish
export const getFoodById = (id) => instance.get(`/admin/${id}`);

// ➕ Yangi taom qo‘shish
export const addFood = (formData) =>
  instance.post("/admin", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ✏️ Taomni yangilash
export const updateFood = (id, formData) =>
  instance.patch(`/admin/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ❌ Taomni o‘chirish
export const deleteFood = (id) => instance.delete(`/admin/${id}`);
