import { Dispatch, SetStateAction } from "react";

import Heading from "../../Heading";
import Counter from "../../inputs/Counter";

interface Props {
  guestCount: number;
  onGuestCountChange: Dispatch<SetStateAction<number>>;
  roomCount: number;
  onRoomCountChange: Dispatch<SetStateAction<number>>;
  bathroomCount: number;
  onBathroomCountChange: Dispatch<SetStateAction<number>>;
}

function RoomsStep({
  guestCount,
  onGuestCountChange,
  bathroomCount,
  onBathroomCountChange,
  onRoomCountChange,
  roomCount,
}: Props) {
  return (
    <div className="flex flex-col gap-6 pb-6">
      <Heading
        title="Share some basic about your place"
        subtitle="What amenities do you have?"
      />
      <Counter
        title="Guests"
        subtitle="How many guests do you allow?"
        value={guestCount}
        onChange={onGuestCountChange}
      />
      <hr />
      <Counter
        title="Rooms"
        subtitle="How many room do you have?"
        value={roomCount}
        onChange={onRoomCountChange}
      />
      <hr />
      <Counter
        title="Bathrooms"
        subtitle="How many bathrooms do you have?"
        value={bathroomCount}
        onChange={onBathroomCountChange}
      />
    </div>
  );
}
export default RoomsStep;
