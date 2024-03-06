import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const LogFoodDatePicker = ({ selectedDate, onChange }) => {
  const currentDate = new Date().toLocaleDateString();
  const handlePreviousDate = () => {
    const previousDate = new Date(selectedDate);
    previousDate.setDate(previousDate.getDate() - 1);
    onChange(previousDate);
  };
  const handleNextDate = () => { 
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);
    onChange(nextDate);
  }
  return (
    <div className="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 text-surface-light"
        onClick={handlePreviousDate}
      >
        <path
          fillRule="evenodd"
          d="M10.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L12.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z"
          clipRule="evenodd"
        />
        <path
          fillRule="evenodd"
          d="M4.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L6.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z"
          clipRule="evenodd"
        />
      </svg>

      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        wrapperClassName="bg-[#2f2b3a] rounded border"
        className="w-full bg-surface-dark border border-surface-light rounded p-1 focus:outline-none focus:border-secondary text-surface-light  font-semibold text-center"
        placeholderText={currentDate}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 text-surface-light"
        onClick={handleNextDate}
      >
        <path
          fillRule="evenodd"
          d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
          clipRule="evenodd"
        />
        <path
          fillRule="evenodd"
          d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default LogFoodDatePicker;
