// src/components/AgentPage/AgentConfig.tsx

"use client";
import React from "react";
import dynamic from "next/dynamic";
import FormElements from "../FormElements";
import NoAgent from "./NoAgent";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface AgentConfigProps {
  agent_id: string; // Add agent_id here
  llmConfig: {
    initial_message: string;
    prompt_preamble: string;
    llm_model_id: string;
    model_name: string;
  } | null;
  sttConfig: {
    use_backchannels: boolean;
    end_conversation_on_goodbye: boolean;
  } | null;
}

const AgentConfig: React.FC<AgentConfigProps> = ({
  agent_id,
  llmConfig,
  sttConfig,
}) => {
  return (
    <div className="col-span-12 rounded-sm px-0 pb-0 pt-0 shadow-default dark:border-strokedark sm:px-0 xl:col-span-9">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        {llmConfig && sttConfig ? (
          <FormElements
            agent_id={agent_id}
            llmConfig={llmConfig}
            sttConfig={sttConfig}
          />
        ) : (
          <NoAgent />
        )}
      </div>
    </div>
  );
};

export default AgentConfig;
