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
      const res = await getFoods();
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
    fetchFoods();
    fetchSchedule();
  }, [dateStr]);

  const handleAdd = async (foodId) => {
    await addToSchedule(dateStr, foodId);
    fetchSchedule();
  };

  const handleRemove = async (scheduleId) => {
    await removeFromSchedule(scheduleId);
    fetchSchedule();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Menyu {dateStr}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Barcha taomlar:</h5>
        {foods.map((f) => (
          <Button
            key={f.id}
            className="me-2 mb-2"
            variant="success"
            onClick={() => handleAdd(f.id)}
          >
            {f.name}
          </Button>
        ))}

        <h5 className="mt-3">Menyu:</h5>
        {schedule.map((s) => (
          <Button
            key={s.id}
            className="me-2 mb-2"
            variant="danger"
            onClick={() => handleRemove(s.id)}
          >
            {s.food.name} &times;
          </Button>
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default FoodListModal;
