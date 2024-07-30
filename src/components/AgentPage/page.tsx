"use client";

import React, { useState } from "react";
import AddAgent from "./AddAgent";
import NoAgent from "@/components/AgentPage/NoAgent";
import AgentConfig from "./AgentConfig";
import AgentModal from "@/components/Model/AgentModel"; // Ensure correct import

const AgentPage: React.FC = () => {
  const [showAdditionalCharts, setShowAdditionalCharts] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenAgentConfig = () => {
    setShowAdditionalCharts(true);
    setIsModalOpen(false); // Close the main modal
  };

  return (
    <>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-0 md:gap-3 2xl:mt-7.5 2xl:gap-7.5">
        <AddAgent onCloseModal={() => setIsModalOpen(true)} onOpenAgentConfig={handleOpenAgentConfig} />
        <AgentModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onOpenAgentConfig={handleOpenAgentConfig}
        />
        {showAdditionalCharts ? <AgentConfig /> : <NoAgent />}
      </div>
    </>
  );
};

export default AgentPage;
