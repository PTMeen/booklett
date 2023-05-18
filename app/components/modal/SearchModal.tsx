"use client";

import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useMemo, useState, useCallback } from "react";
import { Range } from "react-date-range";
import qs from "query-string";

import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import Button from "../inputs/Button";
import { CountryType } from "@/app/hooks/useCountries";
import CountrySelect from "../inputs/CountrySelect";
import Calendar from "../inputs/Calandar";
import Counter from "../inputs/Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const initialDateRange: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

function SearchModal() {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [step, setStep] = useState(STEPS.LOCATION);
  const [location, setLocation] = useState<CountryType | null>(null);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  const Map = useMemo(() => {
    return dynamic(() => import("../Map"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const actionLabel = useMemo(() => {
    return step === STEPS.INFO ? "Apply Filter" : "Next";
  }, [step]);

  const onAction = useCallback(() => {
    if (step !== STEPS.INFO) {
      return setStep((prev) => prev + 1);
    }

    // apply filter
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = dateRange.startDate.toISOString();
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = dateRange.endDate.toISOString();
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    step,
    params,
    dateRange,
    guestCount,
    roomCount,
    bathroomCount,
    location,
    searchModal,
    router,
  ]);

  let stepContent = (
    <div className="flex flex-col gap-6">
      <CountrySelect
        country={location}
        onCountryChange={setLocation}
      />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    stepContent = (
      <div className="flex flex-col gap-6">
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    stepContent = (
      <div className="flex flex-col gap-6">
        <Counter
          title="Guests"
          subtitle="How many guests are coming?"
          value={guestCount}
          onChange={setGuestCount}
        />
        <Counter
          title="Rooms"
          subtitle="How rooms do you need?"
          value={roomCount}
          onChange={setRoomCount}
        />
        <Counter
          title="Bathroom"
          subtitle="How bathrooms do you need?"
          value={bathroomCount}
          onChange={setBathroomCount}
        />
      </div>
    );
  }

  const bodyContent = (
    <div className="flex flex-col gap-8">
      {stepContent}
      <div className="flex items-center gap-4">
        {step !== STEPS.LOCATION && (
          <Button
            outline
            label="Back"
            className="!flex-grow"
            onClick={() => setStep((prev) => prev - 1)}
          />
        )}
        <Button
          label={actionLabel}
          className="flex-grow"
          onClick={onAction}
        />
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      title="Filter"
      body={bodyContent}
    />
  );
}
export default SearchModal;
