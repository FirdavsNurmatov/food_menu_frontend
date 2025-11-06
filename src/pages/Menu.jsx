import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BASE_URL = "http://84.54.118.39:3007";
const REFRESH_INTERVAL = 30000; // 30 soniya

export default function Menu() {
  const [foods, setFoods] = useState([]);

  // const screenId = 1; // 👈 Har televizor uchun o‘zgartiriladi

  const loadFoods = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const res = await fetch(`${BASE_URL}/foods/${today}`);
      if (!res.ok) throw new Error("Serverdan ma'lumot olinmadi");

      const parsedData = await res.json();
      const onlyFoods = parsedData.filter(
        (item) => item.category == "FIRST" || item.category == "SECOND"
      );
      const data = onlyFoods.map((item) => item.food);
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
  // const mid = Math.ceil(foods.length / 2);
  // const firstHalf = foods.slice(0, mid);
  // const secondHalf = foods.slice(mid);
  const visibleFoods = foods;

  return (
    <div
      className="container-fluid p-3"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden", // scroll yo‘q
        height: "100vh",
        backgroundColor: "#f2f2f2", // yumshoq kulrang fon
      }}
    >
      {visibleFoods.length === 0 ? (
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
            gridTemplateRows: "repeat(3, 1fr)", // 3 qator
            gap: "2vh",
          }}
        >
          {visibleFoods.slice(0, 8).map((food) => {
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
                  border: "2px solid #e0e0e0", // yumshoq chegara
                  borderRadius: "1.5rem",
                  overflow: "hidden",
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
                  className="card-body text-center d-flex flex-column justify-content-center p-2"
                  style={{ height: "40%" }}
                >
                  {/* 🔹 Taom nomi */}
                  <h5
                    className="fw-semibold mb-1"
                    style={{
                      fontSize: "2vw", // avvalgidan kattaroq
                      color: "#212529",
                    }}
                  >
                    {food.name}
                  </h5>

                  {/* 🔹 Narxi */}
                  <p
                    className="mb-1 fw-bold"
                    style={{
                      color: "#003975ff", // 🔵 ko‘k rang
                      fontSize: "1.8vw", // avvalgidan kattaroq
                    }}
                  >
                    {food.price?.toLocaleString()} so‘m
                  </p>

                  {/* 🔹 Tavsif */}
                  {/* {food.description && (
                    <p
                      className="text-muted"
                      style={{
                        fontSize: "1vw",
                        lineHeight: "1.3vw",
                        marginBottom: 0,
                      }}
                    >
                      {food.description}
                    </p>
                  )} */}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
