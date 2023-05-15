"use client";

import { ChangeEvent } from "react";
import Heading from "../Heading";

interface Props {
  title: string;
  onTitleChange: (value: string) => void;
  description: string;
  onDescriptionCahnge: (value: string) => void;
  price: number;
  onPriceChange: (vale: number) => void;
}

function InfoStep({
  description,
  onDescriptionCahnge,
  onTitleChange,
  title,
  onPriceChange,
  price,
}: Props) {
  return (
    <div className="flex flex-col gap-6">
      <Heading
        title="How would you describe your place?"
        subtitle="Short and sweet works best!"
      />
      <div>
        <div className="mb-1 tex-lg text-neutral-600">
          <label htmlFor="title">Title</label>
        </div>
        <input
          id="title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full p-2 border rounded-lg outline-none border-neutral-200 focus:outline-orange-300/50 focus:border-orange-400 text-neutral-800"
        />
      </div>
      <div>
        <div className="mb-1 tex-lg text-neutral-600">
          <label htmlFor="title">Description</label>
        </div>
        <input
          id="description"
          value={description}
          onChange={(e) => onDescriptionCahnge(e.target.value)}
          className="w-full p-2 border rounded-lg outline-none border-neutral-200 focus:outline-orange-300/50 focus:border-orange-400 text-neutral-800"
        />
      </div>
      <div>
        <div className="mb-1 tex-lg text-neutral-600">
          <label htmlFor="title">Price</label>
        </div>
        <input
          id="price"
          type="number"
          value={price}
          min={0}
          step={1}
          onChange={(e) => onPriceChange(+e.target.value)}
          className="w-full p-2 border rounded-lg outline-none border-neutral-200 focus:outline-orange-300/50 focus:border-orange-400 text-neutral-800"
        />
      </div>
    </div>
  );
}
export default InfoStep;
