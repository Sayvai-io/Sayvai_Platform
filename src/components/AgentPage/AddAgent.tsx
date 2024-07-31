"use client";

import React, { useState } from "react";
import AgentModal from "@/components/Model/AgentModel";

interface AddAgentProps {
  onCloseModal: () => void;
  onOpenAgentConfig: () => void;
}

const AddAgent: React.FC<AddAgentProps> = ({ onCloseModal, onOpenAgentConfig }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agents, setAgents] = useState<string[]>([]);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    onCloseModal();
    addAgent();
  };

  const addAgent = () => {
    setAgents([...agents, `Agent ${agents.length + 1} created jgjhkjhbkjjdfkhksgjlifaklsj`]);
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-3">
      <div className="mb-4 gap-4 justify-center items-center h-full">
        <button onClick={openModal} className="flex items-center bg-[#70cac1] text-white p-1.5 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#f1f4f4"
            className="mr-2"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
          </svg>
          <span className="mr-12">Add Agent</span>
        </button>
        <AgentModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          onOpenAgentConfig={onOpenAgentConfig} 
        />
        <div className="mt-4">
         {agents.map((agentMessage, index) => (
        <button
           key={index}
           className="flex items-center bg-[#70cac1] text-white p-1.5 rounded mt-2"
           style={{
           width: '180px',
           overflow: 'hidden',
           whiteSpace: 'nowrap',
          }}
        >
         <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
         {agentMessage}
        </div>
        </button>
       ))}
      </div>

      </div>
      
    </div>
  );
};

export default AddAgent;
