import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import CalendarPage from "./pages/CalendarPage";
import FoodDay from "./pages/FoodDay";
import FoodTable from "./components/FoodTable"; // 🍽️ yangi import
import Menu from "./pages/Menu";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Login sahifa */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/calendar" /> : <LoginForm />}
        />

        {/* Kalendar (asosiy) */}
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <CalendarPage />
            </ProtectedRoute>
          }
        />

        {/* Tanlangan kunning menyusi */}
        <Route
          path="/foods/:date"
          element={
            <ProtectedRoute>
              <FoodDay />
            </ProtectedRoute>
          }
        />

        {/* 🍽️ Barcha foodlarni boshqarish sahifasi */}
        <Route
          path="/foods"
          element={
            <ProtectedRoute>
              <FoodTable />
            </ProtectedRoute>
          }
        />

        <Route path="/menu/1" element={<Menu />} />
        <Route path="/menu/2" element={<SecondMenu />} />
      </Routes>
    </Router>
  );
}

export default App;
