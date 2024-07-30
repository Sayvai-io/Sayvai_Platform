import React, { useState } from "react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AgentModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [showNestedModal, setShowNestedModal] = useState(false);

  const handleClickInsideModal = (event: React.MouseEvent<HTMLDivElement>) => {
    // Prevent clicks on child elements from closing the modal
    event.stopPropagation();
    // Open the nested modal
    setShowNestedModal(true);
  };

  const handleCloseModals = () => {
    // Close both modals
    setShowNestedModal(false);
    onClose();
  };

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Close modals when clicking inside the main modal content
    if (!showNestedModal) {
      handleCloseModals();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={handleModalClick}>
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Select LLM of your agent</h2>
            <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-md" onClick={handleClickInsideModal}>
              <div className="justify-center text-center">
                <div className="w-full max-w-sm p-4">
                  <div className="relative h-40">
                    <Image
                      src="/images/AgentProm/Prom.jpg" // Path to your image relative to the public directory
                      alt="Agent Promotional Image"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Single-Prompt Agent</h3>
                  <p className="text-sm text-gray-600">Single Prompt LLM</p>
                  <p className="text-sm text-gray-600 mt-2">Ideal for straightforward tasks requiring a brief prompt</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showNestedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={handleCloseModals}>
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Start from Blank</h2>
            <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
              <div className="justify-center text-center">
                <div className="w-full max-w-sm p-4">
                  <div className="relative h-40">
                    <Image
                      src="/images/AgentProm/Prom.jpg" // Path to your image relative to the public directory
                      alt="Agent Promotional Image"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2"> Agent</h3>
                  <p className="text-sm text-gray-600">Single Prompt LLM</p>
                  <p className="text-sm text-gray-600 mt-2">Ideal for straightforward tasks requiring a brief prompt</p>
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
