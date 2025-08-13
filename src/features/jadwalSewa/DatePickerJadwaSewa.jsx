import { useState } from "react";
import { format } from "date-fns";
import { useSearchParams } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
        calendarClassName="z-10"
        popperPlacement="top-start"
        inline
      />
    </>
  );
}

export default DatePickerJadwaSewa;
