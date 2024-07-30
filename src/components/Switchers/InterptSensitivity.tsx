"use client";

import React, { useState } from "react";

const InterptSensitivity: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("Off");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label className="mb-3 block text-md font-medium text-black dark:text-white">
        LLM Option
      </label>
      <select
        value={selectedOption}
        onChange={handleChange}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
      >
        <option value="On">On</option>
        <option value="Off">Off</option>
      </select>
    </div>
  );
};

export default InterptSensitivity;
