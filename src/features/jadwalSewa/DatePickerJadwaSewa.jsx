import { format } from "date-fns";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchParams } from "react-router";

function DatePickerJadwaSewa() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const today = format(new Date(), "yyyy-MM-dd");

  function handleFilterChange(value) {
    const date = value ? format(value, "yyyy-MM-dd") : today;
    searchParams.set("date", date);
    setSearchParams(searchParams);
  }

  return (
    <>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          handleFilterChange(date);
        }}
        dateFormat="yyyy-MM-dd"
        calendarClassName="z-50"
        popperPlacement="top-start"
        inline
      />
    </>
  );
}

export default DatePickerJadwaSewa;
