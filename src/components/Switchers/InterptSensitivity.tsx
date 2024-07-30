"use client";

import React, { useState } from "react";

const InterptSensitivity: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("Off");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label className="text-md mb-3 block font-medium text-black dark:text-white">
        LLM Option
      </label>
      <select
        value={selectedOption}
        onChange={handleChange}
        className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:text-white"
      >
        <option value="On">High</option>
        <option value="Off">Low</option>
      </select>
    </div>
  );
};

export default InterptSensitivity;
