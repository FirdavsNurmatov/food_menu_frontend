import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getScheduleByDate } from "../services/scheduleService";

const FoodDay = () => {
  const { date } = useParams();
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getScheduleByDate(date);
        setSchedule(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [date]);

  return (
    <div className="container my-3">
      <h2>Menyu {date}</h2>
      {schedule.map((s) => (
        <div key={s.id}>
          {s.food.name} - {s.food.price} сўм
        </div>
      ))}
    </div>
  );
};

export default FoodDay;
