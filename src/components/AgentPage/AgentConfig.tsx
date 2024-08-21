// src/components/AgentPage/AgentConfig.tsx

"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import FormElements from "../FormElements";
import NoAgent from "./NoAgent";
import Loader from "../common/Loader";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface AgentConfigProps {
  agent_id: string; // Add agent_id here
  agent_name: string;
  loading: boolean;
  llmConfig: {
    initial_message: string;
    prompt_preamble: string;
    llm_model_id: string;
    model_name: string;
  } | null;
  sttConfig: {
    use_backchannels: boolean;
    end_conversation_on_goodbye: boolean;
    interrupt_sensitivity: string;
  } | null;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

const AgentConfig: React.FC<AgentConfigProps> = ({
  agent_id,
  llmConfig,
  sttConfig,
  agent_name,
  loading,
  setFlag,
}) => {
  return (
    <div className="col-span-12 rounded-sm px-0 pb-0 pt-0 shadow-default dark:border-strokedark sm:px-0 xl:col-span-9">
      {loading ? (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading && <Loader />}
        </div>
      ) : (
        <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
          {llmConfig && sttConfig ? (
            <FormElements
              agent_id={agent_id}
              llmConfig={llmConfig}
              sttConfig={sttConfig}
              agent_name={agent_name}
              setFlag={setFlag}
            />
          ) : (
            <NoAgent />
          )}
        </div>
      )}
    </div>
  );
};

export default AgentConfig;
