"use client";

import { fieldClass, FieldLabel } from "@/components/site/Field";

interface AuthInputProps {
  label: string;
  type: string;
  placeholder: string;
  name: string;
  required?: boolean;
}

export default function AuthInput({ label, type, placeholder, name, required = false }: AuthInputProps) {
  return (
    <label htmlFor={name} className="block">
      <FieldLabel>{label}</FieldLabel>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={fieldClass}
      />
    </label>
  );
}
