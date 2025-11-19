import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { instance } from "../config/instance";

const FoodForm = ({ food, onSuccess, isEdit }) => {
  const [name, setName] = useState(food?.name || "");
  const [price, setPrice] = useState(food?.price || "");
  const [description, setDescription] = useState(food?.description || "");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState(food?.category || "FOOD"); // 🔹 default = FOOD

  useEffect(() => {
    if (food) {
      setName(food.name);
      setPrice(food.price);
      setDescription(food.description);
      setCategory(food.category || "FOOD");
    }
  }, [food]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      if (isEdit) {
        await instance.patch(`/admin/${food.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        formData.append("category", category);
        await instance.post(`/admin`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setName("");
      setPrice("");
      setDescription("");
      setImage(null);
      setCategory("FOOD");
      onSuccess();
    } catch (err) {
      console.error("❌ Error saving food:", err);
    }
  };

  return (
    <>
      {/* ✅ Ichimlik uchun checkbox */}
      {!isEdit && (
        <div className="d-flex justify-content-around">
          <Form.Group
            className="mb-3 d-flex align-items-center gap-3"
            controlId="isDrink"
          >
            <Form.Label className="mb-0">Taom</Form.Label>
            <Form.Check
              type="checkbox"
              checked={category === "FOOD"}
              onChange={(e) => setCategory("FOOD")}
              style={{ transform: "scale(1.5)", cursor: "pointer" }} // 🔹 kattalashtirish
            />
          </Form.Group>
          <Form.Group
            className="mb-3 d-flex align-items-center gap-3"
            controlId="isDrink"
          >
            <Form.Label className="mb-0">Ichimlik</Form.Label>
            <Form.Check
              type="checkbox"
              checked={category === "DRINK"}
              onChange={(e) => setCategory("DRINK")}
              style={{ transform: "scale(1.5)", cursor: "pointer" }} // 🔹 kattalashtirish
            />
          </Form.Group>
        </div>
      )}

      {category == "FOOD" ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Taom nomi</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Narxi</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>

          {/* <Form.Group className="mb-3">
            <Form.Label>Sharx</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group> */}

          <Form.Group className="mb-3">
            <Form.Label>Sur'at</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Yakunlash
          </Button>
        </Form>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Ichimlik nomi</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Narxi</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Sur'at</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Yakunlash
          </Button>
        </Form>
      )}
    </>
  );
};

export default FoodForm;
