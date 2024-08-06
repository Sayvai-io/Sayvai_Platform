// src/components/AgentPage/AddAgent.tsx

"use client";

import React, { useState, useEffect } from "react";
import AgentModal from "@/components/Model/AgentModel";
import { BASE_URL } from "@/utils/constants";

interface AddAgentProps {
  onCloseModal: () => void;
  onOpenAgentConfig: () => void;
  setLlmConfig: React.Dispatch<
    React.SetStateAction<{
      initial_message: string;
      prompt_preamble: string;
      llm_model_id: string;
      model_name: string;
    } | null>
  >;
  setSttConfig: React.Dispatch<
    React.SetStateAction<{
      use_backchannels: boolean;
      end_conversation_on_goodbye: boolean;
    } | null>
  >;
}

const AddAgent: React.FC<AddAgentProps> = ({
  onCloseModal,
  onOpenAgentConfig,
  setLlmConfig,
  setSttConfig,
  setAgentId, // Add setAgentId prop
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agents, setAgents] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const session = localStorage.getItem("supabaseSession");
        if (!session) {
          throw new Error("No session found");
        }
        const { access_token } = JSON.parse(session);

        const response = await fetch(`${BASE_URL}/get_agents`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        const data = await response.json();
        const agentList = data.map((item: { id: string; name: string }) => ({
          id: item.id,
          name: item.name,
        }));
        setAgents(agentList);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchAgents();
  }, []);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    onCloseModal();
  };

  const handleAgentClick = async (agentId: string) => {
    try {
      const session = localStorage.getItem("supabaseSession");
      if (!session) {
        throw new Error("No session found");
      }
      const { access_token } = JSON.parse(session);

      const response = await fetch(`${BASE_URL}/get_llm_configurations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({ agent_id: agentId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Error ${response.status}: ${errorData.message}`);
        return;
      }

      const configData = await response.json();
      const {
        initial_message,
        prompt_preamble,
        llm_model_id,
        use_backchannels,
        end_conversation_on_goodbye,
      } = configData;

      const modelResponse = await fetch(`${BASE_URL}/get_models`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const models = await modelResponse.json();
      const model = models.find(
        (model: { id: string }) => model.id === llm_model_id,
      );

      setLlmConfig({
        initial_message,
        prompt_preamble,
        llm_model_id,
        model_name: model ? model.name : "Unknown",
      });

      setSttConfig({ use_backchannels, end_conversation_on_goodbye });

      setAgentId(agentId); // Set agentId
      onOpenAgentConfig();
    } catch (error) {
      console.error("Error fetching LLM configuration:", error);
    }
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-3">
      <div className="mb-4 h-full items-center justify-center gap-4">
        <button
          onClick={openModal}
          className="flex items-center rounded bg-[#70cac1] p-1.5 text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#f1f4f4"
            className="mr-2"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
          <span className="mr-12">Add Agent</span>
        </button>
        <AgentModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onOpenAgentConfig={onOpenAgentConfig}
        />
        <div className="mt-4">
          {agents.map((agent, index) => (
            <button
              key={index}
              onClick={() => handleAgentClick(agent.id)}
              className="mt-2 flex items-center rounded bg-[#70cac1] p-1.5 text-white"
              style={{
                width: "180px",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              <div
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {agent.name}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddAgent;
