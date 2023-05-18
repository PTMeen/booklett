"use client";

import { DotLoader } from "react-spinners";

function Spinner() {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <DotLoader
        size={100}
        color="orange"
      />
    </div>
  );
}
export default Spinner;
