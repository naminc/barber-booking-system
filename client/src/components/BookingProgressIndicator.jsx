import React from "react";

const BookingProgressIndicator = ({ currentStep = 1 }) => {
  const steps = [
    { number: 1, label: "Dịch vụ" },
    { number: 2, label: "Barber" },
    { number: 3, label: "Thời gian" },
  ];

  return (
    <div className="flex justify-center mb-12 px-4">
      <div className="flex items-center space-x-2 sm:space-x-4 max-w-full">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step.number
                    ? "bg-[var(--color-gold)]"
                    : "bg-[var(--color-border)]"
                }`}
              >
                <span
                  className={`font-bold text-sm sm:text-base ${
                    currentStep >= step.number
                      ? "text-black"
                      : "text-[var(--color-text-muted)]"
                  }`}
                >
                  {step.number}
                </span>
              </div>
              <span
                className={`font-semibold text-xs sm:text-sm mt-1 ${
                  currentStep >= step.number
                    ? "text-[var(--color-gold)]"
                    : "text-[var(--color-text-muted)]"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-8 sm:w-16 h-0.5 ${
                  currentStep > step.number
                    ? "bg-[var(--color-gold)]"
                    : "bg-[var(--color-border)]"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BookingProgressIndicator;
