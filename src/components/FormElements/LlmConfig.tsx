// src/components/FormElements/LLMConfig.tsx

"use client";

import React, { useState, useEffect } from "react";
import LLMOption from "@/components/Switchers/LLMOption";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import { BASE_URL } from "@/utils/constants";

interface LLMConfigProps {
  agent_id: string;
  initial_message: string;
  prompt_preamble: string;
  llm_model_id: string;
  model_name: string;
}

const LLMConfig: React.FC<LLMConfigProps> = ({
  agent_id,
  initial_message: initialMessageProp,
  prompt_preamble: promptPreambleProp,
  llm_model_id,
  model_name,
}) => {
  const [initialMessage, setInitialMessage] = useState(initialMessageProp);
  const [promptPreamble, setPromptPreamble] = useState(promptPreambleProp);
  const [selectedModel, setSelectedModel] = useState(llm_model_id);

  const updateConfig = async () => {
    try {
      const session = localStorage.getItem("supabaseSession");
      if (!session) {
        throw new Error("No session found");
      }
      const { access_token } = JSON.parse(session);

      const newConfig = {
        initial_message: initialMessage,
        prompt_preamble: promptPreamble,
        llm_model_id: selectedModel,
      };

      await fetch(`${BASE_URL}/change_llm_configurations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({ agent_id, new_config: newConfig }),
      });
    } catch (error) {
      console.error("Error updating LLM configuration:", error);
    }
  };

  const handleInitialMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setInitialMessage(event.target.value);
  };

  const handlePromptPreambleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setPromptPreamble(event.target.value);
  };

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
  };

  const handleSave = () => {
    updateConfig();
  };

  return (
    <div className="border-stroke px-6.5 py-4 dark:border-strokedark">
      <h2 className="text-2xl font-bold">LLM Configuration</h2>
      <p className="text-xs">Model Name: {model_name}</p>
      <p className="text-xs">LLM Model ID: {llm_model_id}</p>
      <div className="flex flex-col gap-5.5 p-6.5">
        <div>
          <label className="text-md mb-3 block font-medium text-black dark:text-white">
            Initial Message
          </label>
          <textarea
            rows={2}
            value={initialMessage}
            onChange={handleInitialMessageChange}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-[#16C3A6] active:border-[#16C3A6] disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-[#16C3A6]"
          ></textarea>
        </div>
        <div>
          <label className="text-md mb-3 block font-medium text-black dark:text-white">
            Agent Prompt
          </label>
          <textarea
            rows={6}
            value={promptPreamble}
            onChange={handlePromptPreambleChange}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-[#16C3A6] active:border-[#16C3A6] disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-[#16C3A6]"
          ></textarea>
        </div>
      </div>
      <LLMOption
        llm_model_id={selectedModel}
        onModelChange={handleModelChange}
      />

      <div>
        <label className="text-md mb-3 block font-medium text-black dark:text-white">
          Who Speaks First
        </label>
        <div className="flex flex-col gap-5.5 p-0">
          <SelectGroupTwo />
        </div>
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          Disabled label
        </label>
        <input
          type="text"
          placeholder="Disabled label"
          disabled
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
        />
      </div>

      <button
        onClick={handleSave}
        className="mt-4 rounded bg-[#16C3A6] px-4 py-2 text-white"
      >
        Save
      </button>
    </div>
  );
};

export default LLMConfig;
