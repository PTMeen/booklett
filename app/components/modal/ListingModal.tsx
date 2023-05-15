"use client";

import { useState, useMemo, useCallback } from "react";

import useListingModal from "@/app/hooks/useListingModal";
import Modal from "./Modal";
import Button from "../inputs/Button";
import CategoryStep from "../listings/CategoryStep";
import LocationStep from "../listings/LocationStep";
import useCountries, { CountryType } from "@/app/hooks/useCountries";
import RoomsStep from "../listings/RoomsStep";
import PhotoStep from "../listings/PhotoStep";
import InfoStep from "../listings/InfoStep";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 1,
  LOCATION = 2,
  ROOMS = 3,
  PHOTO = 4,
  INFO = 5,
}

function ListingModal() {
  const router = useRouter();

  const listingModal = useListingModal();
  const { getAllCountries } = useCountries();
  const countries = getAllCountries();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [selectedCategory, setSelectedCataegory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(countries[0]);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [imageSrc, setImageSrc] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(100);

  const resetData = () => {
    setStep(STEPS.CATEGORY);
    setSelectedCataegory("");
    setSelectedLocation(countries[0]);
    setGuestCount(1);
    setRoomCount(1);
    setBathroomCount(1);
    setImageSrc("");
    setTitle("");
    setDescription("");
    setPrice(100);
  };

  const createListing = async () => {
    if (
      !selectCategory ||
      !selectedLocation ||
      !guestCount ||
      !roomCount ||
      !bathroomCount ||
      !imageSrc ||
      !title ||
      !description ||
      !price
    ) {
      return toast.error("Please fill all the fields");
    }

    const listingData = {
      selectedCategory,
      selectedLocation,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      title,
      description,
      price,
    };

    try {
      setIsLoading(true);
      await axios.post("/api/listings", listingData);
      listingModal.onClose();
      resetData();
      router.refresh();
      toast.success("New listing created");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const actionLabel = useMemo(() => {
    return step === STEPS.INFO ? "Add Listing" : "Next";
  }, [step]);

  const secondaryLabel = useMemo(() => {
    return step === STEPS.CATEGORY ? undefined : "Back";
  }, [step]);

  const onAction = () => {
    if (step !== STEPS.INFO) {
      return setStep((prev) => prev + 1);
    }

    createListing();
  };

  const onSecondaryAction = useCallback(() => {
    if (step !== STEPS.CATEGORY) {
      return setStep((prev) => prev - 1);
    }
  }, [step]);

  const selectCategory = (category: string) => setSelectedCataegory(category);

  let stepContent = (
    <CategoryStep
      onSelect={selectCategory}
      selectedCategory={selectedCategory}
    />
  );

  if (step === STEPS.LOCATION) {
    stepContent = (
      <LocationStep
        onLocationChange={(location: CountryType) =>
          setSelectedLocation(location)
        }
        location={selectedLocation}
      />
    );
  }

  if (step === STEPS.ROOMS) {
    stepContent = (
      <RoomsStep
        guestCount={guestCount}
        onGuestCountChange={setGuestCount}
        bathroomCount={bathroomCount}
        onBathroomCountChange={setBathroomCount}
        roomCount={roomCount}
        onRoomCountChange={setRoomCount}
      />
    );
  }

  if (step === STEPS.PHOTO) {
    stepContent = (
      <PhotoStep
        imageSrc={imageSrc}
        onChange={setImageSrc}
      />
    );
  }

  if (step === STEPS.INFO) {
    stepContent = (
      <InfoStep
        title={title}
        onTitleChange={setTitle}
        description={description}
        onDescriptionCahnge={setDescription}
        price={price}
        onPriceChange={setPrice}
      />
    );
  }

  const bodyContent = (
    <div className="flex flex-col gap-6">
      <div>{stepContent}</div>

      <div className="flex gap-4">
        {secondaryLabel && (
          <Button
            outline
            label={secondaryLabel}
            className="flex-grow"
            onClick={onSecondaryAction}
            disabled={isLoading}
          />
        )}
        <Button
          label={actionLabel}
          className="flex-grow"
          onClick={onAction}
          disabled={isLoading}
          isLoading={isLoading}
        />
      </div>
    </div>
  );

  return (
    <Modal
      title="Booklett you home"
      isOpen={listingModal.isOpen}
      onClose={listingModal.onClose}
      body={bodyContent}
    />
  );
}
export default ListingModal;
