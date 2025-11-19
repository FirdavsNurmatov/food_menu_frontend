import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://84.54.118.39:3007";
const REFRESH_INTERVAL = 30000; // 30 soniya

export default function Drinks() {
  const [drinks, setDrinks] = useState([]);

  const loadDrinks = async () => {
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
    loadDrinks();
    const refreshTimer = setInterval(loadDrinks, REFRESH_INTERVAL);
    return () => clearInterval(refreshTimer);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b, #0f172a)",
        overflow: "hidden",
      }}
    >
      <div className="container-fluid py-3" style={{ height: "100%" }}>
        {drinks.length === 0 ? (
          <div
            className="text-center"
            style={{ fontSize: "2.5rem", marginTop: "10vh", color: "#f87171" }}
          >
            Hali ichimlik tanlanmagan
          </div>
        ) : (
          <div
            className="row g-3 h-100"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gridAutoRows: "1fr",
              gap: "0.5rem",
            }}
          >
            {drinks.map((drink) => {
              const img = drink.image?.startsWith("http")
                ? drink.image
                : `${BASE_URL}/uploads/drinks/${drink.image}`;

              return (
                <div
                  key={drink.id}
                  className="card position-relative shadow-lg"
                  style={{
                    overflow: "hidden",
                    borderRadius: "18px",
                    background: "linear-gradient(135deg, #1f2937, #111827)",
                    border: "1px solid #374151",
                    padding: "1px",
                  }}
                >
                  {/* DARK OVERLAY */}
                  <div
                    className="position-absolute w-100 h-100"
                    style={{
                      top: 0,
                      left: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.5), transparent)",
                      zIndex: 2,
                    }}
                  ></div>

                  {/* IMAGE */}
                  <div style={{ overflow: "hidden" }}>
                    <img
                      src={img}
                      alt={drink.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  {/* TEXTS */}
                  <div
                    className="position-absolute w-100 px-3 pb-2"
                    style={{
                      bottom: 0,
                      zIndex: 10,
                    }}
                  >
                    <h3
                      style={{
                        color: "white",
                        fontSize: "2rem",
                        margin: 0,
                        fontWeight: "bold",
                        textShadow: "0px 0px 6px black",
                      }}
                    >
                      {drink.name}
                    </h3>

                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <div
                        style={{
                          background:
                            "linear-gradient(90deg, #f59e0b, #ea580c)",
                          padding: "2px 8px",
                          borderRadius: "10px",
                        }}
                      >
                        <span
                          style={{
                            color: "white",
                            fontWeight: "900",
                            fontSize: "2rem",
                          }}
                        >
                          {drink.price?.toLocaleString()} {"сўм"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
