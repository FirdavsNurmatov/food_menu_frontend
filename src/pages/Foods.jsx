import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://84.54.118.39:3007";
const REFRESH_INTERVAL = 30000; // 30s

export default function Foods() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true); // Dastlabki yuklanish holati
  const [error, setError] = useState(null); // Xatolik xabari uchun

  const loadFoods = async (showLoadingAnimation = false) => {
    // Agar bu birinchi yuklanish yoki "Qayta urinish" bo'lsa, loading ko'rsatamiz.
    // Har 30 soniyada orqada yangilanganda foydalanuvchiga xalaqit bermaslik uchun shunday qilindi.
    if (showLoadingAnimation) setLoading(true);

    try {
      // Foydalanuvchi qurilmasi qayerda bo'lishidan qat'iy nazar, Toshkent vaqti bilan yyyy-mm-dd formatida oladi
      // en-CA formati har doim "YYYY-MM-DD" ko'rinishida matn qaytaradi.
      const today = new Date().toLocaleDateString("en-CA", {
        timeZone: "Asia/Tashkent",
      });
      const res = await fetch(`${BASE_URL}/foods/${today}`);

      if (!res.ok) {
        throw new Error(`Server xatosi: ${res.status}. Maʼlumot olinmadi.`);
      }

      const parsedData = await res.json();
      const data = parsedData.map((item) => item.food);

      setFoods(data);
      setError(null); // Agar muvaffaqiyatli bo'lsa, eski xatolarni tozalaymiz
    } catch (err) {
      console.error("Xatolik:", err);
      // Foydalanuvchiga tushunarli xabar
      setError(
        err.message === "Failed to fetch"
          ? "Internet bilan aloqa uzildi. Serverga ulanib bo'lmadi."
          : err.message,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Birinchi marta yuklanayotganda loader ko'rinishi uchun true uzatamiz
    loadFoods(true);

    const t = setInterval(() => {
      // Har 30 soniyada orqa fonda jimgina yangilaydi (ekranni qotirmasdan)
      loadFoods(false);
    }, REFRESH_INTERVAL);

    return () => clearInterval(t);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b, #0f172a)",
        overflow: "hidden",
      }}
    >
      {/* ==================== MAIN CONTAINER ==================== */}
      <div
        className="container-fluid d-flex flex-column justify-content-center"
        style={{
          height: "100%",
          padding: "clamp(0.3rem, 0.5vw, 0.8rem)",
        }}
      >
        {/* 1. LOADING HOLATI */}
        {loading ? (
          <div className="text-center w-100">
            <div
              className="spinner-border text-warning"
              role="status"
              style={{ width: "3.5rem", height: "3.5rem", borderWidth: "5px" }}
            >
              <span className="visually-hidden">Yuklanmoqda...</span>
            </div>
            <div
              style={{
                fontSize: "clamp(1.2rem, 3vw, 2rem)",
                color: "#94a3b8",
                marginTop: "1.5rem",
              }}
            >
              Taomlar roʻyxati yuklanmoqda...
            </div>
          </div>
        ) : /* 2. XATOLIK HOLATI */
        error ? (
          <div className="text-center w-100 px-3">
            <div
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                color: "#ef4444",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              ⚠️ Xatolik yuz berdi
            </div>
            <div
              style={{
                fontSize: "clamp(1rem, 2vw, 1.3rem)",
                color: "#cbd5e1",
                marginBottom: "2rem",
              }}
            >
              {error}
            </div>
            <button
              onClick={() => loadFoods(true)}
              className="btn btn-warning btn-lg px-4"
              style={{
                borderRadius: "12px",
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
            >
              Qayta urinish
            </button>
          </div>
        ) : /* 3. TAOMLAR BO'SHOQLIK HOLATI */
        foods.length === 0 ? (
          <div
            className="text-center w-100"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              color: "#f87171",
              padding: "0 1rem",
            }}
          >
            Bugun uchun hali taom tanlanmagan
          </div>
        ) : (
          /* 4. MA'LUMOTLAR MUVAFFAQIYATLI YUKLANGANDAGI GRID */
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
            {foods.slice(0, 20).map((food) => {
              const img = food.image?.startsWith("http")
                ? food.image
                : `${BASE_URL}/uploads/foods/${food.image}?v=${food.id}`;

              return (
                <div
                  key={food.id}
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
                  <div style={{ overflow: "hidden", height: "100%" }}>
                    <img
                      src={img}
                      alt={food.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      // Rasm yuklana olmay qolsa fallback placeholder rasm qo'yish (ixtiyoriy)
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/600x400/1f2937/ffffff?text=Rasm+Mavjud+Emas";
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
                        fontSize: "clamp(1.1rem, 1.55vw, 1.5rem)",
                        margin: 0,
                        fontWeight: "bold",
                        textShadow: "0px 0px 6px black",
                      }}
                    >
                      {food.name}
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
                            fontSize: "clamp(1.1rem, 1.55vw, 1.5rem)",
                            whiteSpace: "nowrap",
                            display: "inline-block",
                          }}
                        >
                          {food.price?.toLocaleString()} {"сўм"}
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
