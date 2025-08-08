import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DatePickerJadwaSewa() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy-MM-dd"
        calendarClassName="z-50"
        popperPlacement="top-start"
        inline
        className="placeholder:text-netral-600 text-netral-800 w-full border-none bg-transparent font-medium outline-none placeholder:text-sm"
      />
    </>
  );
}

export default DatePickerJadwaSewa;
