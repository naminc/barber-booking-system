import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Hours from "./components/Hours";
import Prices from "./components/Prices";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Booking from "./pages/Booking";
import SelectService from "./pages/SelectService";
import SelectBarber from "./pages/SelectBarber";
import SelectTime from "./pages/SelectTime";
import BookingConfirmation from "./pages/BookingConfirmation";
import Review from "./pages/Review";
import EditProfile from "./pages/EditProfile";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Settings from "./pages/Admin/Settings";
import Staff from "./pages/Admin/Staff";
import AdminServices from "./pages/Admin/Services";
import Bookings from "./pages/Admin/Bookings";
import Users from "./pages/Admin/UserManagement/Users";
import AddUser from "./pages/Admin/UserManagement/AddUser";
import EditUser from "./pages/Admin/UserManagement/EditUser";
import AddService from "./pages/Admin/AddService";
import AddBooking from "./pages/Admin/AddBooking";
import AddStaff from "./pages/Admin/AddStaff";
import { BookingProvider } from "./context/BookingContext";
import { SettingsProvider } from "./context/SettingsContext";
import GuestRoute from "./routes/GuestRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import Forbidden from "./pages/Forbidden";

function Home() {
  return (
    <>
      <div className="w-full h-screen overflow-hidden">
        <Header />
        <Hero />
      </div>
      <About />
      <Services />
      <Hours />
      <Prices />
      <div className="w-full flex-col bg-dark pt-20">
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <BookingProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route element={<ProtectedRoute roles={["user", "admin"]} />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking/select-service" element={<SelectService />} />
            <Route path="/booking/select-barber" element={<SelectBarber />} />
            <Route path="/booking/select-time" element={<SelectTime />} />
            <Route
              path="/booking/confirmation"
              element={<BookingConfirmation />}
            />
            <Route path="/review" element={<Review />} />
            <Route path="/edit-profile" element={<EditProfile />} />
          </Route>
          <Route element={<ProtectedRoute roles={["admin"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="settings" element={<Settings />} />
              <Route path="staff" element={<Staff />} />
              <Route path="staff/add" element={<AddStaff />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="services/add" element={<AddService />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/add" element={<AddBooking />} />
              <Route path="users" element={<Users />} />
              <Route path="users/add" element={<AddUser />} />
              <Route path="users/edit/:id" element={<EditUser />} />
            </Route>
          </Route>
          <Route path="/403" element={<Forbidden />} />
        </Routes>
      </BookingProvider>
    </SettingsProvider>
  );
}
