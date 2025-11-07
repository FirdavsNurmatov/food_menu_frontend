import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://84.54.118.39:3007";
const REFRESH_INTERVAL = 30000; // 30 soniya

export default function Drinks() {
  const [drinks, setDrinks] = useState([]);

  const loaddrinks = async () => {
    try {
      const res = await fetch(`${BASE_URL}/drinks`);
      if (!res.ok) throw new Error("Serverdan ma'lumot olinmadi");

      const parsedData = await res.json();
      setDrinks(parsedData);
    } catch (error) {
      console.error("❌ Ma'lumot olishda xatolik:", error);
      setDrinks([]);
    }
  };

  useEffect(() => {
    loaddrinks();
    const refreshTimer = setInterval(loaddrinks, REFRESH_INTERVAL);
    return () => clearInterval(refreshTimer);
  }, []);

  return (
    <div
      className="container-fluid p-3"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden", // scroll yo‘q
        height: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      {drinks.length === 0 ? (
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
            gridTemplateColumns: "repeat(5, 1fr)", // 5 ustun
            gridTemplateRows: "repeat(4, 1fr)", // 3 qator
            gap: "2vh",
          }}
        >
          {drinks.map((food) => {
            return (
              <div
                key={food.id}
                className="card border-2 shadow-sm"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "1.5rem",
                  backgroundColor: "#fff",
                  overflow: "hidden",
                }}
              >
                <div
                  className="card-body text-center position-relative p-2 d-flex flex-column align-items-center"
                  style={{ height: "40%" }}
                >
                  {/* 🔹 Taom nomi */}
                  <h5
                    className="fw-semibold mb-1"
                    style={{
                      fontSize: "2.7vw",
                      color: "#212529",
                    }}
                  >
                    {food.name}
                  </h5>

                  {/* 🔹 Narxi */}
                  <p
                    className="mb-0 fw-bold position-absolute"
                    style={{
                      bottom: "0vw",
                      fontSize: "2.7vw",
                      color: "#003975ff", // 🔵 ko‘k rang
                    }}
                  >
                    {food.price?.toLocaleString()} so‘m
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
