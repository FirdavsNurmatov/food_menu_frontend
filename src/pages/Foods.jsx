// import { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// const BASE_URL = import.meta.env.VITE_BASE_URL || "http://84.54.118.39:3007";
// const REFRESH_INTERVAL = 30000; // 30 soniya

// export default function Foods() {
//   const [foods, setFoods] = useState([]);

//   const loadFoods = async () => {
//     try {
//       const today = new Date().toISOString().split("T")[0];
//       const res = await fetch(`${BASE_URL}/foods/${today}`);
//       if (!res.ok) throw new Error("Serverdan ma'lumot olinmadi");

//       const parsedData = await res.json();
//       const data = parsedData.map((item) => item.food);
//       setFoods(data);
//     } catch (error) {
//       console.error("❌ Ma'lumot olishda xatolik:", error);
//       setFoods([]);
//     }
//   };

//   useEffect(() => {
//     loadFoods();
//     const refreshTimer = setInterval(loadFoods, REFRESH_INTERVAL);
//     return () => clearInterval(refreshTimer);
//   }, []);

//   return (
//     <div
//       className="container-fluid p-3"
//       style={{
//         backgroundImage: "url('/bg.jpg')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         overflow: "hidden",
//         height: "100vh",
//         backgroundColor: "#f2f2f2",
//       }}
//     >
//       {foods.length === 0 ? (
//         <div
//           className="text-center text-danger"
//           style={{ fontSize: "2vw", marginTop: "10vh" }}
//         >
//           Hali taom tanlanmagan
//         </div>
//       ) : (
//         <div
//           className="d-grid justify-content-center align-items-center"
//           style={{
//             height: "100%",
//             gridTemplateColumns: "repeat(5, 1fr)",
//             gridTemplateRows: `repeat(${Math.ceil(foods.length / 5)}, 1fr)`,
//             gap: "1vh",
//           }}
//         >
//           {foods.map((food) => {
//             const imageUrl = food.image?.startsWith("http")
//               ? food.image
//               : `${BASE_URL}/uploads/foods/${food.image}`;

//             return (
//               <div
//                 key={food.id}
//                 className="card border-2 shadow-sm"
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   border: "2px solid #e0e0e0",
//                   borderRadius: "1.5rem",
//                   overflow: "hidden",
//                   display: "flex",
//                   flexDirection: "column",
//                 }}
//               >
//                 {food.image && (
//                   <img
//                     src={imageUrl}
//                     style={{
//                       width: "100%",
//                       height: "40%",
//                       objectFit: "cover",
//                     }}
//                   />
//                 )}
//                 <div
//                   className="card-body d-flex flex-column justify-content-between align-items-center text-center"
//                   style={{ height: "40%", padding: "0" }}
//                 >
//                   {/* 🔹 Taom nomi */}
//                   {food.name.split(" ").length > 2 ? (
//                     <h5
//                       className="fw-semibold mb-1"
//                       style={{
//                         fontSize: "clamp(14px, 2vw, 28px)", // avtomatik fit bo‘ladi
//                         color: "#212529",
//                         textAlign: "center",
//                         wordBreak: "break-word",
//                       }}
//                     >
//                       {food.name}
//                     </h5>
//                   ) : (
//                     <h5
//                       className="fw-semibold mb-1"
//                       style={{
//                         fontSize: "2.1vw",
//                         color: "#212529",
//                         textAlign: "center",
//                         wordBreak: "break-word",
//                       }}
//                     >
//                       {food.name}
//                     </h5>
//                   )}

//                   {/* 🔹 Narxi */}
//                   <p
//                     className="mb-0 fw-bold position-absolute bottom-0"
//                     style={{
//                       fontSize: "2.7vw",
//                       color: "#003975ff",
//                       textAlign: "center",
//                     }}
//                   >
//                     {food.price?.toLocaleString()} {"сўм"}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://84.54.118.39:3007";
const REFRESH_INTERVAL = 30000; // 30s

export default function Foods() {
  const [foods, setFoods] = useState([]);

  const loadFoods = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const res = await fetch(`${BASE_URL}/foods/${today}`);
      if (!res.ok) throw new Error("Serverdan maʼlumot olinmadi");

      const parsedData = await res.json();
      const data = parsedData.map((item) => item.food);
      setFoods(data);
      // setFoods(data.s0plice(0, 10));
    } catch (err) {
      console.error("Xatolik:", err);
      setFoods([]);
    }
  };

  useEffect(() => {
    loadFoods();
    const t = setInterval(loadFoods, REFRESH_INTERVAL);
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
      {/* ==================== GRID ==================== */}
      <div
        className="container-fluid"
        style={{
          height: "100%",
          padding: "clamp(0.3rem, 0.5vw, 0.8rem)",
        }}
      >
        {foods.length === 0 ? (
          <div
            className="text-center"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              marginTop: "10vh",
              color: "#f87171",
              padding: "0 1rem",
            }}
          >
            Hali taom tanlanmagan
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
            {foods.slice(0, 20).map((food) => {
              const img = food.image?.startsWith("http")
                ? food.image
                : `${BASE_URL}/uploads/foods/${food.image}`;

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
                  <div style={{ overflow: "hidden" }}>
                    <img
                      src={img}
                      alt={food.name}
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
                    {/* {food.name.split(" ").length > 2 ? (
                      <h3
                        style={{
                          color: "white",
                          fontSize: "2rem",
                          margin: 0,
                          fontWeight: "bold",
                          textShadow: "0px 0px 6px black",
                        }}
                      >
                        {food.name}
                      </h3>
                    ) : (
                      <h3
                        style={{
                          color: "white",
                          fontSize: "2rem",
                          margin: 0,
                          fontWeight: "bold",
                          textShadow: "0px 0px 6px black",
                        }}
                      >
                        {food.name}
                      </h3>
                    )} */}

                    <h3
                      style={{
                        color: "white",
                        fontSize: "clamp(1.1rem, 1.55vw, 1.5rem)", // yana + biroz kattalashtirildi
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
                            fontSize: "clamp(1.1rem, 1.55vw, 1.5rem)", // yana + biroz kattalashtirildi
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
