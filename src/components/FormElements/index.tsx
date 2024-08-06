// src/components/FormElements/index.tsx

"use client";

import React from "react";
import TTS_Config from "./TtsConfig";
import LLm_Config from "./LlmConfig";
import Stt_Config from "./SttConfig";
import PrivacySettings from "./PrivacySettings";

interface FormElementsProps {
  agent_id: string;
  llmConfig: {
    initial_message: string;
    prompt_preamble: string;
    llm_model_id: string;
    model_name: string;
  };
  sttConfig: {
    use_backchannels: boolean;
    end_conversation_on_goodbye: boolean;
  };
}

const FormElements: React.FC<FormElementsProps> = ({
  agent_id,
  llmConfig,
  sttConfig,
}) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
      <div className="flex flex-col gap-3 sm:col-span-12">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <TTS_Config />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:col-span-8">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <LLm_Config agent_id={agent_id} {...llmConfig} />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:col-span-4">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col gap-5.5 p-6.5">
            <PrivacySettings />
          </div>
        </div>

        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <Stt_Config agent_id={agent_id} sttConfig={sttConfig} />
        </div>
      </div>
    </div>
  );
};

export default FormElements;
