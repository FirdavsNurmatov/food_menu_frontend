import { useState } from "react";
import FoodListModal from "./FoodListModal";

const MobileScheduleCalendar = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [showModal, setShowModal] = useState(false);
  const [showFoodModal, setShowFoodModal] = useState(false);

  // 7 kunlik oynani tuzish
  const generateDays = () => {
    const days = [];
    for (let i = -3; i <= 3; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const days = generateDays();

  const formatDate = (date) => {
    let formatted = date.toLocaleDateString("uz-UZ", {
      weekday: "long",
      day: "2-digit",
      month: "long",
    });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  return (
    <div
      className="min-vh-100 position-relative"
      style={{
        background: "linear-gradient(180deg, #f0f4ff 0%, #ffffff 100%)",
        padding: "1.2rem",
      }}
    >
      {/* Sarlavha */}
      <div className="text-center mb-4">
        <h4 className="fw-bold text-primary mb-1">Haftalik menyu</h4>
        <p className="text-secondary small mb-0">
          Kunlarni tanlab, menyuni boshqaring.
        </p>
      </div>

      {/* Kunlar ro‘yxati */}
      <div className="d-flex flex-column gap-3">
        {days.map((day) => {
          const isToday = day.toDateString() === today.toDateString();
          const isSelected = day.toDateString() === selectedDate.toDateString();

          return (
            <div
              key={day}
              onClick={() => {
                setSelectedDate(day);
                setShowModal(true);
              }}
              className="day-card"
              style={{
                background: isSelected
                  ? "linear-gradient(90deg, #007bff 0%, #00c6ff 100%)"
                  : isToday
                  ? "#fff7e6"
                  : "#ffffff",
                color: isSelected ? "white" : "#333",
                borderRadius: "16px",
                padding: "16px 18px",
                border: isSelected ? "none" : "1px solid #e2e8f0",
                boxShadow: isSelected
                  ? "0 4px 12px rgba(0, 123, 255, 0.3)"
                  : "0 2px 6px rgba(0,0,0,0.05)",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              <div className="fw-semibold fs-6">{formatDate(day)}</div>
              <small
                style={{
                  color: isSelected ? "#e8f4ff" : "#666",
                  opacity: isToday ? 0.8 : 1,
                }}
              >
                {isToday
                  ? "Bugungi menyuni ko‘rish"
                  : "Menyu qo‘shish / ko‘rish"}
              </small>
            </div>
          );
        })}
      </div>

      {/* Modal oynalar */}
      <FoodListModal
        show={showModal}
        onHide={() => setShowModal(false)}
        selectedDate={selectedDate}
      />

      <FoodListModal
        show={showFoodModal}
        onHide={() => setShowFoodModal(false)}
        selectedDate={today}
      />

      {/* Floating button */}
      <button
        onClick={() => setShowFoodModal(true)}
        className="position-fixed d-flex align-items-center justify-content-center"
        style={{
          bottom: "20px",
          right: "20px",
          width: "58px",
          height: "58px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #007bff 0%, #00c6ff 100%)",
          border: "none",
          boxShadow: "0 6px 14px rgba(0,0,0,0.2)",
          color: "#fff",
          fontSize: "22px",
        }}
      >
        +
      </button>
    </div>
  );
};

export default MobileScheduleCalendar;
