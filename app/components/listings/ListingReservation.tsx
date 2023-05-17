"use client";

import { Range } from "react-date-range";

import Calendar from "@/app/components/inputs/Calandar";
import Button from "../inputs/Button";

interface Props {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
  isLoading?: boolean;
}

function ListingReservation({
  dateRange,
  disabledDates,
  onChangeDate,
  onSubmit,
  price,
  totalPrice,
  disabled,
  isLoading,
}: Props) {
  return (
    <div className="bg-white border rounded-lg lg:flex-grow border-neutral-200">
      <div className="p-5">
        <p>
          <span className="text-2xl font-bold">${price}</span> night
        </p>
      </div>
      <hr />
      <div className="p-5">
        <Calendar
          value={dateRange}
          disabledDates={disabledDates}
          onChange={(value) => onChangeDate(value.selection)}
        />
      </div>
      <div className="p-5">
        <Button
          label={`Reserve $${totalPrice}`}
          className="w-full"
          disabled={disabled}
          onClick={onSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
export default ListingReservation;
