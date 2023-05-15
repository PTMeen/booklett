"use client";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface Props {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

function Counter({ subtitle, title, onChange, value }: Props) {
  const increase = () => {
    onChange(value + 1);
  };

  const decrease = () => {
    if (value === 1) return;
    onChange(value - 1);
  };

  return (
    <div className="flex items-center">
      <div className="flex-grow">
        <div className="mb-2 text-lg font-bold">{title}</div>
        <div className="text-neutral-600">{subtitle}</div>
      </div>
      <div className="flex items-center gap-5">
        <button
          onClick={decrease}
          className="flex items-center justify-center p-3 border rounded-lg border-neutral-200 text-neutral-600 hover:opacity-70"
        >
          <AiOutlineMinus />
        </button>
        <div className="text-xl">{value}</div>
        <button
          onClick={increase}
          className="flex items-center justify-center p-3 border rounded-lg border-neutral-200 text-neutral-600 hover:opacity-70"
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
}
export default Counter;
