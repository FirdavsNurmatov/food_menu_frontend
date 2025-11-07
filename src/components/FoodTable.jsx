import { useEffect, useState } from "react";
import { getFoods, deleteFood } from "../services/foodService";
import FoodForm from "./FoodForm";
import {
  Modal,
  Button,
  Card,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://84.54.118.39:3007";

const FoodTable = () => {
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const response = await getFoods();
      setFoods(response.data.filter((f) => f.category === "FOOD") || []);
      setDrinks(response.data.filter((d) => d.category === "DRINK"));
    } catch (error) {
      console.error("❌ Error fetching foods:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Haqiqatan ham o‘chirmoqchimisiz?")) return;
    await deleteFood(id);
    fetchFoods();
  };

  const handleEdit = (food) => {
    setEditingFood(food);
    setShowModal(true);
  };

  const handleFormSuccess = () => {
    fetchFoods();
    setShowModal(false);
    setEditingFood(null);
  };

  return (
    <Container className="py-4">
      {/* Agar taomlar bo‘lmasa */}
      {!loading && foods.length === 0 && drinks.length === 0 && (
        <Alert variant="info" className="text-center">
          Hozircha hech qanday taom mavjud emas. "➕ Yangi qo‘shish" tugmasi
          orqali qo‘shing.
        </Alert>
      )}

      {/* Ma'lumot yuklanayotganda */}
      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Yuklanmoqda...</p>
        </div>
      )}

      {/* Header qismi */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-primary mb-0">🍽️ Taomlar ro‘yxati</h3>
        <div>
          <Button
            variant="secondary"
            className="me-2"
            onClick={() => window.history.back()}
          >
            ← Ortga
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setEditingFood(null);
              setShowModal(true);
            }}
          >
            ➕ Yangi yaratish
          </Button>
        </div>
      </div>

      {/* Taomlar ro‘yxati */}
      <Row className="g-4">
        {foods.map((food) => (
          <Col xs={12} md={6} lg={4} key={food.id}>
            <Card
              className="shadow-sm h-100"
              style={{
                borderRadius: "16px",
                transition: "0.25s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.02)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              {food.image && (
                <Card.Img
                  variant="top"
                  src={`${BASE_URL}/uploads/foods/${food.image}`}
                  alt={food.name}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                  }}
                />
              )}
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title className="text-capitalize">
                    {food.name}
                  </Card.Title>
                  <Card.Text className="text-muted mb-2">
                    {food.description || "Tavsif mavjud emas"}
                  </Card.Text>
                  <h5 className="fw-semibold text-success">
                    {food.price?.toLocaleString()} so'm
                  </h5>
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <Button
                    variant="outline-warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(food)}
                  >
                    ✏️ O'zgartirish
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(food.id)}
                  >
                    🗑️ O'chirish
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
        <h3 className="fw-bold text-primary mb-0">🥤 Ichimliklar ro‘yxati</h3>
        {/* <div>
          <Button
            variant="secondary"
            className="me-2"
            onClick={() => window.history.back()}
          >
            ← Ortga
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setEditingFood(null);
              setShowModal(true);
            }}
          >
            ➕ Yangi yaratish
          </Button>
        </div> */}
      </div>

      {/* Ichimliklar ro‘yxati */}
      <Row className="g-4">
        {drinks.map((food) => (
          <Col xs={12} md={6} lg={4} key={food.id}>
            <Card
              className="shadow-sm h-100"
              style={{
                borderRadius: "16px",
                transition: "0.25s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.02)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title className="text-capitalize">
                    {food.name}
                  </Card.Title>
                  <Card.Text className="text-muted mb-2">
                    {food.description || "Tavsif mavjud emas"}
                  </Card.Text>
                  <h5 className="fw-semibold text-success">
                    {food.price?.toLocaleString()} so'm
                  </h5>
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <Button
                    variant="outline-warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(food)}
                  >
                    ✏️ O'zgartirish
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(food.id)}
                  >
                    🗑️ O'chirish
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal oynasi */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="md"
      >
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            {editingFood ? "✏️ O'zgartirish" : "➕ Yangi yaratish"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <FoodForm
            food={editingFood}
            isEdit={!!editingFood}
            onSuccess={handleFormSuccess}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default FoodTable;
