"use client";

import React, { useState, useEffect } from "react";
import { BASE_URL } from "@/utils/constants";

const LLMOption: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState("");
  const [models, setModels] = useState<string[]>([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch(`${BASE_URL}/get_models`);
        const data = await response.json();
        const modelList = data.map(
          (item: { model_name: string }) => item.model_name,
        );
        setModels(modelList);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    fetchModels();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(event.target.value);
  };

  return (
    <div>
      <label className="text-md mb-3 block font-medium text-black dark:text-white">
        LLM Options
      </label>
      <select
        value={selectedModel}
        onChange={handleChange}
        className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:text-white"
      >
        {models.map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LLMOption;
