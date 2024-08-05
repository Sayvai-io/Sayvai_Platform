// src/components/Switchers/LLMOption.tsx

"use client";

import React, { useState, useEffect } from "react";
import { BASE_URL } from "@/utils/constants";

interface LLMOptionProps {
  llm_model_id: string;
  onModelChange: (modelId: string) => void;
}

const LLMOption: React.FC<LLMOptionProps> = ({
  llm_model_id,
  onModelChange,
}) => {
  const [selectedModel, setSelectedModel] = useState("");
  const [models, setModels] = useState<{ id: string; model_name: string }[]>(
    [],
  );

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const session = localStorage.getItem("supabaseSession");
        if (!session) {
          throw new Error("No session found");
        }
        const { access_token } = JSON.parse(session);

        const response = await fetch(`${BASE_URL}/get_models`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        const data = await response.json();
        setModels(data);

        const matchedModel = data.find(
          (model: { id: string }) => model.id === llm_model_id,
        );
        if (matchedModel) {
          setSelectedModel(matchedModel.model_name);
        }
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    fetchModels();
  }, [llm_model_id]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedModelName = event.target.value;
    setSelectedModel(selectedModelName);
    const selectedModel = models.find(
      (model) => model.model_name === selectedModelName,
    );
    if (selectedModel) {
      onModelChange(selectedModel.id);
    }
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
          <option key={model.id} value={model.model_name}>
            {model.model_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LLMOption;
