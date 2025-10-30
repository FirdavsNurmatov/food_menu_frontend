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

const FoodTable = () => {
  const [foods, setFoods] = useState([]);
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
      setFoods(response.data || []);
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
            ➕ Yangi qo‘shish
          </Button>
        </div>
      </div>

      {/* Ma'lumot yuklanayotganda */}
      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Yuklanmoqda...</p>
        </div>
      )}

      {/* Agar taomlar bo‘lmasa */}
      {!loading && foods.length === 0 && (
        <Alert variant="info" className="text-center">
          Hozircha hech qanday taom mavjud emas. "➕ Yangi qo‘shish" tugmasi
          orqali qo‘shing.
        </Alert>
      )}

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
              {food.image_url && (
                <Card.Img
                  variant="top"
                  src={food.image_url}
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

      {/* Modal oynasi */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="md"
      >
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            {editingFood ? "✏️ Taomni tahrirlash" : "➕ Yangi taom qo‘shish"}
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
