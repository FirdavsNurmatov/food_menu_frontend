import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BASE_URL = "http://84.54.118.39:3007";
const REFRESH_INTERVAL = 30000; // 30 soniya

export default function SecondMenu() {
  const [foods, setFoods] = useState([]);

  // ⚙️ Har bir televizorga qo‘lda ID berish
  const screenId = 2; // 👈 Bu televizor 1 bo‘lsin
  // Ikkinchi televizorda bu qiymatni 2 qilib o‘zgartirasiz

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
    <div className="container py-1">
      {/* <h2 className="text-center mb-5 fw-bold text-primary display-5">
        Bugungi taomlar
      </h2> */}

      {visibleFoods.length === 0 ? (
        <div className="text-center text-danger fs-4">
          Hali taom tanlanmagan
        </div>
      ) : (
        <div className="row justify-content-center g-5">
          {visibleFoods.map((food) => {
            const imageUrl = food.image?.startsWith("http")
              ? food.image
              : `${BASE_URL}/uploads/foods/${food.image}`;

            return (
              <div
                key={food.id}
                className="col-12 col-sm-8 col-md-6 col-lg-4 d-flex justify-content-center"
              >
                <div
                  className="card shadow-lg rounded-4 border-0"
                  style={{ width: "100%", maxWidth: "420px" }}
                >
                  <img
                    src={imageUrl}
                    alt={food.name}
                    className="card-img-top"
                    style={{
                      height: "280px",
                      objectFit: "cover",
                      borderTopLeftRadius: "1.5rem",
                      borderTopRightRadius: "1.5rem",
                    }}
                  />
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h4 className="card-title mb-0 fw-semibold text-dark">
                        {food.name}
                      </h4>
                      <span className="text-success fw-bold fs-5">
                        {food.price?.toLocaleString()} so‘m
                      </span>
                    </div>
                    {food.description && (
                      <p className="card-text mt-3 text-muted fs-6">
                        {food.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
