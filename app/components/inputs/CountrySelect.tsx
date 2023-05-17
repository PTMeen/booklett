"use client";

import { useState, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";

import useCountries, { CountryType } from "@/app/hooks/useCountries";

interface Props {
  onCountryChange: (country: CountryType) => void;
  country: CountryType;
}

function CountrySelect({ onCountryChange, country }: Props) {
  const { getAllCountries } = useCountries();
  const countries = getAllCountries();

  const [selectedCountry, setSelectedCountry] = useState(
    country || countries[0]
  );
  const [query, setQuery] = useState("");

  const filteredCountries =
    query === ""
      ? countries
      : countries.filter((country) => {
          return country.label.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    onCountryChange(selectedCountry);
  }, [selectedCountry, onCountryChange]);

  return (
    <Combobox
      value={selectedCountry}
      onChange={setSelectedCountry}
    >
      <div className="relative">
        <div className="border-[1px] border-neutral-200 rounded-lg p-2 flex items-center">
          <Combobox.Input
            onChange={(e) => setQuery(e.target.value)}
            displayValue={(county: CountryType) => county?.label}
            className="flex-grow font-semibold outline-none focus:outline-none"
          />
          <Combobox.Button>
            <BiChevronDown
              size={20}
              className="text-neutral-800"
            />
          </Combobox.Button>
        </div>
        <Combobox.Options className="max-h-[250px] z-50 border-[1px] absolute rounded-lg shadow-md overflow-y-scroll w-full bg-white">
          {filteredCountries.map((item) => {
            return (
              <Combobox.Option
                key={item.value}
                value={item}
                className="px-4 py-2 transition cursor-pointer text-neutral-600 hover:bg-orange-200 hover:text-neutral-800"
              >
                {item.label}
              </Combobox.Option>
            );
          })}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}
export default CountrySelect;
