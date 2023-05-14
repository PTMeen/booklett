"use client";

import { Field, ErrorMessage } from "formik";

interface Props {
  label?: string;
  id?: string;
  type?: string;
}

function Input({ id = "", label, type = "text" }: Props) {
  return (
    <div>
      <div className="mb-1 tex-lg text-neutral-600">
        <label htmlFor={id}>{label}</label>
      </div>
      <Field
        id={id}
        name={id}
        type={type}
        className="w-full p-2 border rounded-lg outline-none border-neutral-200 focus:outline-orange-300/50 focus:border-orange-400 text-neutral-800"
      />
      <span className="text-sm text-rose-600">
        <ErrorMessage name={id} />
      </span>
    </div>
  );
}
export default Input;
