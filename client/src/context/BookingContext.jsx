import React, { createContext, useContext, useState, useEffect } from "react";

const BookingContext = createContext();

export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingContext must be used within a BookingProvider");
  }
  return context;
};

const STORAGE_KEY = "barber_booking_data";

// Hàm lấy dữ liệu từ localStorage
const getStoredBookingData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error loading booking data from localStorage:", error);
  }
  return null;
};

// Hàm lưu dữ liệu vào localStorage
const saveBookingDataToStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving booking data to localStorage:", error);
  }
};

// Provider cho context booking
export const BookingProvider = ({ children }) => {
  // Khởi tạo state từ localStorage nếu có
  const [bookingData, setBookingData] = useState(() => {
    const stored = getStoredBookingData();
    return (
      stored || {
        service: "",
        serviceDetails: null,
        barber: "",
        barberDetails: null,
        date: "",
        time: "",
        notes: "",
        customerInfo: {
          name: "",
          phone: "",
          email: "",
        },
      }
    );
  });

  // Lưu dữ liệu vào localStorage mỗi khi bookingData thay đổi
  useEffect(() => {
    saveBookingDataToStorage(bookingData);
  }, [bookingData]);

  // Cập nhật dữ liệu booking
  const updateBookingData = (updates) => {
    setBookingData((prevData) => {
      const newData = {
        ...prevData,
        ...updates,
      };
      return newData;
    });
  };

  // Reset dữ liệu booking
  const resetBookingData = () => {
    const defaultData = {
      service: "",
      serviceDetails: null,
      barber: "",
      barberDetails: null,
      date: "",
      time: "",
      notes: "",
      customerInfo: {
        name: "",
        phone: "",
        email: "",
      },
    };
    setBookingData(defaultData);
    // Xóa dữ liệu khỏi localStorage
    localStorage.removeItem(STORAGE_KEY);
  };

  // Giá trị của context
  const value = {
    bookingData,
    updateBookingData,
    resetBookingData,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

export { BookingContext };
