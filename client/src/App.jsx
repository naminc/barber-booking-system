import { Routes, Route } from "react-router-dom";
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
import EditProfile from "./pages/EditProfile";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Settings from "./pages/Admin/Settings";
import Staff from "./pages/Admin/Staff";
import AdminServices from "./pages/Admin/Services";
import Bookings from "./pages/Admin/Bookings";
import Users from "./pages/Admin/Users";

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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/edit-profile" element={<EditProfile />} />

      {/* ADMIN */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="settings" element={<Settings />} />
        <Route path="staff" element={<Staff />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
}
