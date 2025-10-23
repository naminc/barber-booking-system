# 💈 Barber Booking System

<div align="center">

![Barber Booking System](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-18.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![Database](https://img.shields.io/badge/Database-MySQL-orange)

_A modern full-stack barber booking platform for seamless appointment management_

[🌐 Live Demo](#-demo) • [📁 Project Structure](#-project-structure) • [🚀 Features](#-features) • [⚙️ Setup](#️-setup)

</div>

---

## 📋 Overview

A comprehensive **barber booking platform** that enables customers to schedule haircut appointments while providing administrators with powerful tools to manage services, staff, and bookings efficiently.

### 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Authentication:** JWT
- **File Upload:** Multer
- **Deployment:** Vercel

---

## 🌐 Demo

### 🎯 Live Application

| Platform            | URL                                                  | Description                                        |
| ------------------- | ---------------------------------------------------- | -------------------------------------------------- |
| **Customer Portal** | [https://naminc.app](https://naminc.app)             | Book appointments, choose barbers, manage bookings |
| **Admin Dashboard** | [https://naminc.app/admin](https://naminc.app/admin) | Manage services, staff, and schedules              |

### 🔐 Demo Credentials

```
Admin Account:
├── Username: admin@naminc.dev
└── Password: naminc
```

---

## 🚀 Features

### 👤 Customer Features

- ✅ User registration and authentication
- ✅ Browse available services and pricing
- ✅ Select preferred barber/stylist
- ✅ Choose appointment time slots
- ✅ View booking history
- ✅ Profile management
- ✅ Contact form submission

### 👨‍💼 Admin Features

- ✅ Comprehensive dashboard
- ✅ Service management (CRUD operations)
- ✅ Staff management
- ✅ User management
- ✅ Booking oversight
- ✅ Contact message handling
- ✅ Settings configuration
- ✅ Image upload for services/staff

---

## 📁 Project Structure

```
barber-booking/
├── 📁 client/                          # Frontend React Application
│   ├── 📁 src/
│   │   ├── 📁 api/                     # API client modules
│   │   │   ├── authApi.js
│   │   │   ├── axiosClient.js
│   │   │   ├── contactsApi.js
│   │   │   ├── servicesApi.js
│   │   │   ├── settingsApi.js
│   │   │   ├── staffApi.js
│   │   │   └── usersApi.js
│   │   ├── 📁 components/              # Reusable UI components
│   │   │   ├── 📁 Admin/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Sidebar.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── ErrorState.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Hours.jsx
│   │   │   ├── ImageUpload.jsx
│   │   │   ├── LoadingState.jsx
│   │   │   ├── Prices.jsx
│   │   │   └── Services.jsx
│   │   ├── 📁 context/                 # React Context providers
│   │   │   ├── BookingContext.jsx
│   │   │   └── SettingsContext.jsx
│   │   ├── 📁 hooks/                   # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useAvatar.js
│   │   │   ├── useContacts.js
│   │   │   ├── useForm.js
│   │   │   ├── useNotification.js
│   │   │   ├── usePageTitle.js
│   │   │   ├── useProfileUpdate.js
│   │   │   ├── useServices.js
│   │   │   ├── useStaff.js
│   │   │   ├── useUserProfile.js
│   │   │   └── useUsers.js
│   │   ├── 📁 layouts/                 # Layout components
│   │   │   └── AdminLayout.jsx
│   │   ├── 📁 pages/                   # Page components
│   │   │   ├── 📁 Admin/
│   │   │   │   ├── AddBooking.jsx
│   │   │   │   ├── Bookings.jsx
│   │   │   │   ├── Contacts.jsx
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Settings.jsx
│   │   │   │   ├── 📁 ServiceManagement/
│   │   │   │   │   ├── AddService.jsx
│   │   │   │   │   ├── EditService.jsx
│   │   │   │   │   ├── Services.jsx
│   │   │   │   │   └── 📁 components/
│   │   │   │   ├── 📁 StaffManagement/
│   │   │   │   └── 📁 UserManagement/
│   │   │   ├── Booking.jsx
│   │   │   ├── BookingConfirmation.jsx
│   │   │   ├── EditProfile.jsx
│   │   │   ├── Forbidden.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Review.jsx
│   │   │   ├── SelectBarber.jsx
│   │   │   ├── SelectService.jsx
│   │   │   └── SelectTime.jsx
│   │   ├── 📁 routes/                  # Route protection components
│   │   │   ├── GuestRoute.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── 📁 utils/                   # Utility functions
│   │   │   ├── auth.js
│   │   │   └── scrollToId.js
│   │   ├── App.jsx                     # Main App component
│   │   ├── main.jsx                    # Application entry point
│   │   ├── index.css                   # Global styles
│   │   └── theme.css                   # Theme configuration
│   ├── 📁 public/                      # Static assets
│   │   └── vite.svg
│   ├── 📁 imgs/                        # Image assets
│   │   ├── 01.jpg, 02.jpg
│   │   ├── about-img1.jpg
│   │   ├── hero.jpg
│   │   ├── beard.png, blade.png
│   │   ├── bottle.png, hair-dryer.png
│   │   ├── scissors.png
│   │   └── [other images...]
│   ├── index.html                      # HTML template
│   ├── package.json                    # Frontend dependencies
│   ├── tailwind.config.js              # Tailwind CSS config
│   ├── vite.config.js                  # Vite configuration
│   └── vercel.json                     # Vercel deployment config
│
├── 📁 server/                          # Backend Node.js Application
│   ├── 📁 src/
│   │   ├── 📁 config/                  # Database configuration
│   │   │   └── db.js
│   │   ├── 📁 controllers/             # Route controllers
│   │   │   ├── authController.js
│   │   │   ├── contactController.js
│   │   │   ├── reviewController.js
│   │   │   ├── serviceController.js
│   │   │   ├── settingController.js
│   │   │   ├── staffController.js
│   │   │   └── userController.js
│   │   ├── 📁 middlewares/             # Express middlewares
│   │   │   ├── authMiddleware.js
│   │   │   ├── roleMiddleware.js
│   │   │   ├── upload.js
│   │   │   └── validate.js
│   │   ├── 📁 models/                  # Database models
│   │   │   ├── Appointment.js
│   │   │   ├── Contact.js
│   │   │   ├── Review.js
│   │   │   ├── Service.js
│   │   │   ├── Setting.js
│   │   │   ├── Staff.js
│   │   │   └── User.js
│   │   ├── 📁 routes/                  # API routes
│   │   │   ├── authRoutes.js
│   │   │   ├── contactRoutes.js
│   │   │   ├── reviewRoutes.js
│   │   │   ├── serviceRoutes.js
│   │   │   ├── settingRoutes.js
│   │   │   ├── staffRoutes.js
│   │   │   ├── uploadRoutes.js
│   │   │   └── userRoutes.js
│   │   ├── 📁 services/                # Business logic services
│   │   │   ├── authService.js
│   │   │   ├── contactService.js
│   │   │   ├── reviewService.js
│   │   │   ├── serviceService.js
│   │   │   ├── settingService.js
│   │   │   ├── staffService.js
│   │   │   └── userService.js
│   │   ├── 📁 utils/                   # Utility functions
│   │   │   └── helpers.js
│   │   ├── 📁 validations/             # Input validation schemas
│   │   │   ├── reviewValidation.js
│   │   │   ├── settingValidation.js
│   │   │   └── userValidation.js
│   │   └── app.js                      # Express app configuration
│   ├── 📁 public/uploads/              # File upload directory
│   │   └── [uploaded images...]
│   ├── server.js                       # Server entry point
│   ├── db.sql                          # Database schema
│   ├── db_sample.sql                   # Sample database data
│   └── package.json                    # Backend dependencies
│
├── package.json                        # Root package configuration
├── package-lock.json                   # Dependency lock file
└── README.md                           # Project documentation
```

---

## ⚙️ Setup

### Prerequisites

- Node.js (v16 or higher)
- MySQL database
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/barber-booking.git
   cd barber-booking
   ```

2. **Install dependencies**

   ```bash
   # Install root dependencies
   npm install

   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Database setup**

   ```bash
   # Create MySQL database
   mysql -u root -p
   CREATE DATABASE barber_booking;

   # Import database schema
   mysql -u root -p barber_booking < server/db.sql
   ```

4. **Environment configuration**

   ```bash
   # Create .env file in server directory
   cd server
   cp .env.example .env

   # Configure your environment variables
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=barber_booking
   JWT_SECRET=your_jwt_secret
   ```

5. **Run the application**

   ```bash
   # Start the server (from server directory)
   npm start

   # Start the client (from client directory)
   cd ../client
   npm run dev
   ```

### 🚀 Development

- **Client:** http://localhost:5173
- **Server:** http://localhost:5000
- **API:** http://localhost:5000/api

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

<div align="center">

**Made with ❤️ by [Your Name]**

[⭐ Star this repo](https://github.com/your-username/barber-booking) • [🐛 Report Bug](https://github.com/your-username/barber-booking/issues) • [💡 Request Feature](https://github.com/your-username/barber-booking/issues)

</div>
