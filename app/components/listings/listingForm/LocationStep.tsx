import { CountryType } from "@/app/hooks/useCountries";

import { useMemo } from "react";
import dynamic from "next/dynamic";

import Heading from "../../Heading";
import CountrySelect from "../../inputs/CountrySelect";

interface Props {
  onLocationChange: (value: CountryType) => void;
  location: CountryType;
}

function LocationStep({ onLocationChange, location }: Props) {
  const Map = useMemo(
    () => dynamic(() => import("@/app/components/Map"), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  return (
    <div className="flex flex-col gap-6">
      <Heading
        title="Where is your place located?"
        subtitle="Help guest find you"
      />
      <CountrySelect
        onCountryChange={onLocationChange}
        country={location}
      />
      <Map center={location.latlng} />
    </div>
  );
}
export default LocationStep;
