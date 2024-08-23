// src/components/FormElements/TtsConfig.tsx

"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileModal from "@/components/Model/ProfileModal";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  useDisconnectButton,
  useLocalParticipant,
} from "@livekit/components-react";
import { BASE_URL } from "@/utils/constants";

interface TTS_ConfigProps {
  agent_id: string;
  agent_name: string;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

interface RoomMetadataProps {
  connected: boolean;
  selectedAgent: string;
}

const RoomMetadata: React.FC<RoomMetadataProps> = ({
  connected,
  selectedAgent,
}) => {
  const localParticipant = useLocalParticipant();
  useEffect(() => {
    if (connected) {
      localParticipant.localParticipant.setMetadata(
        JSON.stringify({ agent_id: selectedAgent }),
      );
    }
  }, [connected, selectedAgent]);
  return null;
};
const TTS_Config: React.FC<TTS_ConfigProps> = ({
  agent_id,
  agent_name,
  setFlag,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [voice, setVoice] = useState(false);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [connected, setConnected] = useState<boolean>(false);
  const [selectedAgent, setSelectedAgent] = useState<string>(agent_id);
  const [showAgentName, setShowAgentName] = useState(false);
  const [inputValue, setInputValue] = useState(agent_name);
  const [agentName, setAgentName] = useState(agent_name);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleEditName = () => {
    setShowAgentName(!showAgentName);
  };

  const changeAgentName = async () => {
    setShowAgentName(!showAgentName);
    setAgentName(inputValue);
    console.log(inputValue);
    const session = localStorage.getItem("supabaseSession");
    if (!session) {
      console.error("No session found");
      return;
    }
    const { access_token } = JSON.parse(session);
    const response = await fetch(`${BASE_URL}/update_agent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({ agent_id: agent_id, name: inputValue }),
    });
    setFlag((prevState) => !prevState);
  };

  const RevertBack = () => {
    setShowAgentName(!showAgentName);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Update the input value as the user types
  };

  const handleTestCall = async () => {
    if (voice) {
      setToken(undefined);
      setUrl(undefined);
      setVoice(false);
      setConnected(false);
    } else {
      setVoice(true);
      const { accessToken, url } = await fetch("/api/token").then((res) =>
        res.json(),
      );
      setToken(accessToken);
      setUrl(url);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="m-4 flex items-center sm:mb-0">
          {!showAgentName ? (
            <>
              <span>{agentName}</span>
              <svg
                onClick={handleEditName}
                viewBox="0 -960 960 960"
                className="text-gray-700 h-6 w-6 cursor-pointer"
              >
                {" "}
                <path d="M120-120v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm584-528 56-56-56-56-56 56 56 56Z" />{" "}
              </svg>{" "}
            </>
          ) : (
            <div className="align-center flex justify-center">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="border-gray-300 mr-2 w-full rounded-md border px-3 py-1 sm:w-auto"
                placeholder="Enter the name"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6 hover:cursor-pointer"
                onClick={changeAgentName}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6 hover:cursor-pointer"
                onClick={RevertBack}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {/* <button className="flex items-center rounded-md bg-[#b8f5a8] px-1 py-1 text-white hover:bg-[#b8f5a8]">
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
          </button> */}
        </div>
      </div>
      <p className="mb-4 ml-4 mr-2 mt-2 text-sm">Agent ID: {agent_id}</p>
      <div className="flex justify-between p-2">
        <div>
          <Link
            className="flex items-center gap-4"
            href="#"
            onClick={openModal}
          >
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
        <div className="flex items-center">
          {voice ? (
            <div onClick={handleTestCall}>
              <Image
                className="cursor-pointer"
                width={50}
                height={100}
                src={"/images/call/call_end.gif"}
                alt="Call-End"
              />
            </div>
          ) : (
            <div onClick={handleTestCall}>
              <Image
                className="cursor-pointer"
                width={50}
                height={100}
                src={"/images/call/call_start.gif"}
                alt="Call-Start"
              />
            </div>
          )}
          <div>
            <button
              onClick={handleTestCall}
              className={`${voice ? "border-red hover:bg-red" : "border-green-500 hover:bg-green-500"} rounded-full border-2  p-2 font-semibold text-graydark hover:border-graydark  hover:text-white dark:text-white`}
            >
              {!voice ? <span>Test Call</span> : <span>End Call</span>}
            </button>
          </div>
        </div>
      </div>
      {voice && (
        <LiveKitRoom
          audio={true}
          token={token}
          serverUrl={url}
          connectOptions={{ autoSubscribe: true }}
          onConnected={() => setConnected(true)}
        >
          <RoomAudioRenderer />
          <RoomMetadata connected={connected} selectedAgent={selectedAgent} />
        </LiveKitRoom>
      )}
    </div>
  );
};

export default TTS_Config;
