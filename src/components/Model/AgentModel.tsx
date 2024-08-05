"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAgentConfig: () => void; // Prop to notify AgentPage to open AgentConfig
}

const AgentModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onOpenAgentConfig,
}) => {
  const [showNestedModal, setShowNestedModal] = useState(false);

  const handleClickInsideModal = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); // Prevent clicks inside the nested modal from closing it
    setShowNestedModal(true);
  };

  const handleCloseNestedModalAndOpenAgentConfig = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    event.stopPropagation(); // Prevent clicks inside from closing other modals
    setShowNestedModal(false); // Close the nested modal
    // Use a timeout to ensure the state update is processed before opening AgentConfig
    setTimeout(() => {
      onOpenAgentConfig(); // Open AgentConfig after nested modal closes
      onClose(); // Ensure the main modal closes
    }, 0);
  };

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!showNestedModal) {
      onClose(); // Close the main modal only if the nested modal is not open
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="rounded-lg bg-white p-5 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-6 text-center text-2xl font-semibold">
              Select LLM of your agent
            </h2>
            <div
              className="border-gray-300 mx-auto max-w-md rounded-lg border p-6 shadow-md"
              onClick={handleClickInsideModal}
            >
              <div className="justify-center text-center">
                <div className="w-full max-w-sm p-4">
                  <div className="relative h-40">
                    <Image
                      src="/images/AgentProm/Prom.jpg"
                      alt="Agent Promotional Image"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">
                    Single-Prompt Agent
                  </h3>
                  <p className="text-gray-600 text-sm">Single Prompt LLM</p>
                  <p className="text-gray-600 mt-2 text-sm">
                    Ideal for straightforward tasks requiring a brief prompt
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showNestedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="rounded-lg bg-white p-5 shadow-lg"
            // onClick={(e) => e.stopPropagation()}
            onClick={handleCloseNestedModalAndOpenAgentConfig}
          >
            <h2 className="mb-6 text-center text-2xl font-semibold">
              Start from Blank
            </h2>
            <div className="border-gray-300 mx-auto max-w-md rounded-lg border p-6 shadow-md">
              <div className="justify-center text-center">
                <div className="w-full max-w-sm p-4">
                  <div className="relative h-40">
                    <Image
                      src="/images/AgentProm/Prom.jpg"
                      alt="Agent Promotional Image"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Agent</h3>
                  <p className="text-gray-600 text-sm">Single Prompt LLM</p>
                  <p className="text-gray-600 mt-2 text-sm">
                    Ideal for straightforward tasks requiring a brief prompt
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AgentModal;
