import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://84.54.118.39:3007";
const REFRESH_INTERVAL = 30000; // 30 soniya

export default function Foods() {
  const [foods, setFoods] = useState([]);

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

  return (
    <div
      className="container-fluid p-3"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
        height: "100vh",
        backgroundColor: "#f2f2f2",
      }}
    >
      {foods.length === 0 ? (
        <div
          className="text-center text-danger"
          style={{ fontSize: "2vw", marginTop: "10vh" }}
        >
          Hali taom tanlanmagan
        </div>
      ) : (
        <div
          className="d-grid justify-content-center align-items-center"
          style={{
            height: "100%",
            gridTemplateColumns: "repeat(5, 1fr)",
            gridTemplateRows: "repeat(3, 1fr)",
            gap: "2vh",
          }}
        >
          {foods.map((food) => {
            const imageUrl = food.image?.startsWith("http")
              ? food.image
              : `${BASE_URL}/uploads/foods/${food.image}`;

            return (
              <div
                key={food.id}
                className="card border-2 shadow-sm"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "2px solid #e0e0e0",
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <img
                  src={imageUrl}
                  alt={food.name}
                  style={{
                    width: "100%",
                    height: "40%",
                    objectFit: "cover",
                  }}
                />
                <div
                  className="card-body d-flex flex-column justify-content-between align-items-center text-center"
                  style={{ height: "40%", padding: "0rem" }}
                >
                  {/* 🔹 Taom nomi */}
                  <h5
                    className="fw-semibold mb-1"
                    style={{
                      fontSize: "2.1vw",
                      color: "#212529",
                      textAlign: "center",
                      wordBreak: "break-word",
                    }}
                  >
                    {food.name}
                  </h5>

                  {/* 🔹 Narxi */}
                  <p
                    className="mb-0 fw-bold"
                    style={{
                      fontSize: "2.7vw",
                      color: "#003975ff",
                      textAlign: "center",
                    }}
                  >
                    {food.price?.toLocaleString()} {"сўм"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
