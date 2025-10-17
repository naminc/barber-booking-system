import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookingContext must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    service: '',
    serviceDetails: null,
    barber: '',
    barberDetails: null,
    date: '',
    time: '',
    notes: '',
    customerInfo: {
      name: '',
      phone: '',
      email: ''
    }
  });

  const updateBookingData = (updates) => {
    setBookingData(prevData => ({
      ...prevData,
      ...updates
    }));
  };

  const resetBookingData = () => {
    setBookingData({
      service: '',
      serviceDetails: null,
      barber: '',
      barberDetails: null,
      date: '',
      time: '',
      notes: '',
      customerInfo: {
        name: '',
        phone: '',
        email: ''
      }
    });
  };

  const value = {
    bookingData,
    updateBookingData,
    resetBookingData
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export { BookingContext };
