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
      <div
        className="container-fluid"
        style={{
          height: "100%",
          padding: "clamp(0.3rem, 0.5vw, 0.8rem)",
        }}
      >
        {drinks.length === 0 ? (
          <div
            className="text-center"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              marginTop: "10vh",
              color: "#f87171",
              padding: "0 1rem",
            }}
          >
            Hali ichimlik tanlanmagan
          </div>
        ) : (
          <div
            className="h-100"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gridTemplateRows: "repeat(4, 1fr)",
              gap: "clamp(0.25rem, 0.3vw, 0.5rem)",
              padding: "clamp(0.25rem, 0.4vw, 0.6rem)",
            }}
          >
            {drinks.slice(0, 20).map((drink) => {
              const img = drink.image?.startsWith("http")
                ? drink.image
                : `${BASE_URL}/uploads/foods/${drink.image}`;

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
                    className="position-absolute w-100"
                    style={{
                      bottom: 0,
                      zIndex: 10,
                      padding:
                        "clamp(0.4rem, 0.6vw, 0.7rem) clamp(0.6rem, 0.8vw, 1rem) clamp(0.4rem, 0.6vw, 0.7rem)",
                    }}
                  >
                    <h3
                      style={{
                        color: "white",
                        fontSize: "clamp(1.1rem, 1.55vw, 1.5rem)", // yana + biroz kattalashtirildi
                        margin: 0,
                        fontWeight: "bold",
                        textShadow: "0px 0px 6px black",
                      }}
                    >
                      {drink.name}
                    </h3>

                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{ marginTop: "clamp(0.2rem, 0.3vw, 0.4rem)" }}
                    >
                      <div
                        style={{
                          background:
                            "linear-gradient(90deg, #f59e0b, #ea580c)",
                          padding:
                            "clamp(2px, 0.2vw, 4px) clamp(4px, 0.4vw, 8px)",
                          borderRadius: "clamp(4px, 0.4vw, 6px)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          whiteSpace: "nowrap",
                          minWidth: "max-content",
                        }}
                      >
                        <span
                          style={{
                            color: "white",
                            fontWeight: "900",
                            fontSize: "clamp(1.1rem, 1.55vw, 1.5rem)", // yana + biroz kattalashtirildi
                            whiteSpace: "nowrap",
                            display: "inline-block",
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
