import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BASE_URL = "http://84.54.118.39:3007";
const REFRESH_INTERVAL = 30000; // 30 soniya

export default function Menu() {
  const [foods, setFoods] = useState([]);

  const screenId = 1; // 👈 Har televizor uchun o‘zgartiriladi

  const loadFoods = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const res = await fetch(`${BASE_URL}/foods/${today}`);
      if (!res.ok) throw new Error("Serverdan ma'lumot olinmadi");

      const parsedData = await res.json();
      const data = parsedData.map((item) => item.food);
      setFoods(data);
    } catch (error) {
      console.error("❌ Ma'lumot olishda xatolik:", error);
      setFoods([]);
    }
  };

  useEffect(() => {
    loadFoods();
    const refreshTimer = setInterval(loadFoods, REFRESH_INTERVAL);
    return () => clearInterval(refreshTimer);
  }, []);

  // 🔹 Ma’lumotni ikkiga bo‘lish
  const mid = Math.ceil(foods.length / 2);
  const firstHalf = foods.slice(0, mid);
  const secondHalf = foods.slice(mid);
  const visibleFoods = screenId === 1 ? firstHalf : secondHalf;

  return (
    <div
      className="container-fluid p-3"
      style={{
        overflow: "hidden", // ❌ scroll yo‘q
        height: "100vh", // butun ekran balandligi
        backgroundColor: "#f8f9fa", // yumshoq fon
      }}
    >
      {visibleFoods.length === 0 ? (
        <div className="text-center text-danger fs-3 mt-5">
          Hali taom tanlanmagan
        </div>
      ) : (
        <div
          className="d-grid justify-content-center align-items-center"
          style={{
            height: "100%",
            gridTemplateColumns: "repeat(4, 1fr)", // 4 ta ustun
            gridTemplateRows: "repeat(2, 1fr)", // 2 ta qator
            gap: "2vh", // oraliq
          }}
        >
          {visibleFoods.slice(0, 8).map((food) => {
            const imageUrl = food.image?.startsWith("http")
              ? food.image
              : `${BASE_URL}/uploads/foods/${food.image}`;

            return (
              <div
                key={food.id}
                className="card border-0 shadow-sm"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "1.5rem",
                  backgroundColor: "#fff",
                  overflow: "hidden", // rasm toshib chiqmasin
                }}
              >
                <img
                  src={imageUrl}
                  alt={food.name}
                  style={{
                    width: "100%",
                    height: "60%",
                    objectFit: "cover",
                  }}
                />
                <div
                  className="card-body text-center p-2 d-flex flex-column justify-content-center"
                  style={{ height: "40%" }}
                >
                  <h5
                    className="fw-semibold mb-1"
                    style={{ fontSize: "1.3rem", color: "#212529" }}
                  >
                    {food.name}
                  </h5>
                  <p
                    className="mb-0 text-success fw-bold"
                    style={{ fontSize: "1.2rem" }}
                  >
                    {food.price?.toLocaleString()} so‘m
                  </p>
                  {food.description && (
                    <p
                      className="text-muted mt-1"
                      style={{
                        fontSize: "0.9rem",
                        lineHeight: "1.2rem",
                        marginBottom: 0,
                      }}
                    >
                      {food.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
