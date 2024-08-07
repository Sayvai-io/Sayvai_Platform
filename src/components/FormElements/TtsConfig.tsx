// src/components/FormElements/TtsConfig.tsx

"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileModal from "@/components/Model/ProfileModal";

interface TTS_ConfigProps {
  agent_id: string;
}

const TTS_Config: React.FC<TTS_ConfigProps> = ({ agent_id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="font-bold">TTS Configuration</h3>
        <div className="flex gap-2">
          <button className="flex items-center rounded-md bg-[#b8f5a8] px-1 py-1 text-white hover:bg-[#b8f5a8]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#666666"
              className="mt-1 cursor-pointer"
              onClick={() => alert("Button 1 clicked")}
            >
              <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm72-144h72v-336h-72v336Zm120 0h72v-336h-72v336Z" />
            </svg>
          </button>
        </div>
      </div>
      <p className="mb-4 mr-2 mt-2 text-sm">Agent ID: {agent_id}</p>
      <div>
        <Link className="flex items-center gap-4" href="#" onClick={openModal}>
          <span className="h-10 w-10 rounded-full">
            <Image
              width={112}
              height={112}
              src={"/images/user/user-01.png"}
              alt="User"
            />
          </span>
          <svg
            className="hidden fill-current sm:block"
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            />
          </svg>
        </Link>

        <ProfileModal
          agent_id={agent_id}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </div>
  );
};

export default TTS_Config;
