import { useNavigate } from "react-router-dom";
import MobileScheduleCalendar from "../components/MobileScheduleCalendar";

const CalendarPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>📅 Oshpaz Kalendar</h4>
        <button
          className="btn btn-outline-primary"
          onClick={() => navigate("/foods")}
        >
          🍽️ Taomlar
        </button>
      </div>

      <MobileScheduleCalendar />
    </div>
  );
};

export default CalendarPage;
