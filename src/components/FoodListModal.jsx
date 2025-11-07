import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { getFoods } from "../services/foodService";
import {
  addToSchedule,
  getScheduleByDate,
  removeFromSchedule,
} from "../services/scheduleService";

const FoodListModal = ({ show, onHide, selectedDate }) => {
  const [foods, setFoods] = useState([]);
  const [schedule, setSchedule] = useState([]);

  const dateStr = selectedDate.toISOString().split("T")[0];

  const fetchFoods = async () => {
    try {
      const res = await getFoods("?category=FOOD");
      setFoods(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSchedule = async () => {
    try {
      const res = await getScheduleByDate(dateStr);
      setSchedule(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (show) {
      fetchFoods();
      fetchSchedule();
    }
  }, [dateStr, show]);

  const handleAdd = async (foodId) => {
    try {
      await addToSchedule({
        date: dateStr,
        foodId,
      });
      await fetchSchedule();
    } catch (err) {
      console.error("❌ Add to schedule error:", err);
    }
  };

  const handleRemove = async (scheduleId) => {
    await removeFromSchedule(scheduleId);
    fetchSchedule();
  };

  // 🍽 Toifalar bo‘yicha ajratish
  const food = schedule;

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Menyu: {dateStr}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Barcha taomlar */}
        <h5>Barcha taomlar:</h5>
        <div className="d-flex flex-wrap gap-2">
          {foods.map((f) => (
            <Button
              key={f.id}
              variant="success"
              onClick={() => handleAdd(f.id)}
            >
              {f.name}
            </Button>
          ))}
        </div>

        {/* Tanlangan menyu */}
        <h5 className="mt-4 mb-3">Tanlangan menyu:</h5>
        <div className="d-flex justify-content-between gap-3">
          <div className="flex-fill border p-2 rounded">
            <h6 className="text-center text-primary">Taomlar</h6>
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              {food.length ? (
                food.map((s) => (
                  <Button
                    key={s.id}
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemove(s.id)}
                  >
                    {s.food.name} &times;
                  </Button>
                ))
              ) : (
                <p className="text-muted small text-center">Bo‘sh</p>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default FoodListModal;
