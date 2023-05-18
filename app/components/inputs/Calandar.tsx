"use client";

import { Range, RangeKeyDict, DateRange } from "react-date-range";
import colors from "tailwindcss/colors";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface Props {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}

function Calandar({ onChange, value, disabledDates = [] }: Props) {
  return (
    <DateRange
      rangeColors={[colors.orange[500]]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  );
}
export default Calandar;
