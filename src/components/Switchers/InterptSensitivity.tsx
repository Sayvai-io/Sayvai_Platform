// src/components/Switchers/InterptSensitivity.tsx

import React from "react";

interface InterptSensitivityProps {
  interrupt_sensitivity: string;
  onChange: (newValue: string) => void;
}

const InterptSensitivity: React.FC<InterptSensitivityProps> = ({
  interrupt_sensitivity,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <label className="text-md mb-3 block font-medium text-black dark:text-white">
        Interrupt Sensitivity
      </label>
      <select
        value={interrupt_sensitivity}
        onChange={handleChange}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-[#16C3A6] active:border-[#16C3A6] dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-[#16C3A6]"
      >
        <option value="low">Low</option>
        <option value="high">High</option>
      </select>
    </div>
  );
};

export default InterptSensitivity;
