// components/ProfileModal.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "react-modal";
import { BASE_URL } from "@/utils/constants";

interface Voice {
  id: string;
  voice: string;
  language_id: string;
}

interface Language {
  id: string;
  language: string;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent_id: string;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  agent_id,
}) => {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [currentVoiceId, setCurrentVoiceId] = useState<string | null>(null);

  useEffect(() => {
    const session = localStorage.getItem("supabaseSession");
    if (!session) {
      console.error("No session found");
      return;
    }
    const { access_token } = JSON.parse(session);

    const fetchVoices = async () => {
      const response = await fetch(`${BASE_URL}/get_all_voices`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const data = await response.json();
      console.log("Fetched voices:", data);
      setVoices(data);
    };

    const fetchLanguages = async () => {
      const response = await fetch(`${BASE_URL}/get_languages`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const data = await response.json();
      console.log("Fetched languages:", data);
      setLanguages(data);
    };

    const fetchCurrentTTSConfig = async () => {
      const response = await fetch(`${BASE_URL}/get_tts_configuration`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({ agent_id: agent_id }),
      });
      const data = await response.json();
      console.log("Fetched current TTS config:", data);
      setCurrentVoiceId(data.voice_id);
    };

    fetchVoices();
    fetchLanguages();
    fetchCurrentTTSConfig();
  }, [agent_id]);

  const handleVoiceChange = async (voiceId: string) => {
    const session = localStorage.getItem("supabaseSession");
    if (!session) {
      console.error("No session found");
      return;
    }
    const { access_token } = JSON.parse(session);

    await fetch(`${BASE_URL}/update_tts_configuration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({ agent_id, voice_id: voiceId }),
    });
    setCurrentVoiceId(voiceId);
  };

  const getLanguageName = (languageId: string) => {
    const language = languages.find((lang) => lang.id === languageId);
    console.log("Language ID:", languageId, "Language Name:", language?.name);
    return language ? language.language : "Unknown";
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Profile Modal"
      className="bg-gray-800 fixed inset-0 flex items-center justify-center bg-opacity-75 p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="w-full max-w-xl rounded-lg bg-white shadow-lg">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-semibold">Profile</h2>
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <p className="px-4 pb-4">This is your profile modal content.</p>

        <table className="mb-4 w-full table-auto">
          <thead>
            <tr className="bg-[#e9e8e8]">
              <th className="px-6 py-2 text-left">Name</th>
              <th className="px-6 py-2 text-left">Voice</th>
              <th className="px-6 py-2 text-left">Language</th>
              <th className="px-6 py-2 text-left">Current</th>
            </tr>
          </thead>
          <tbody>
            {voices.map((voice) => (
              <tr
                key={voice.id}
                className="cursor-pointer border-b"
                onClick={() => handleVoiceChange(voice.id)}
              >
                <td className="flex items-center px-6 py-2">
                  <span className="mr-2 h-10 w-10 rounded-full">
                    <Image
                      width={40}
                      height={40}
                      src={"/images/user/user-01.png"}
                      alt="User"
                      className="rounded-full"
                    />
                  </span>
                  {voice.voice}
                </td>
                <td className="px-6 py-2">{voice.voice}</td>
                <td className="px-6 py-2">
                  {getLanguageName(voice.language_id)}
                </td>
                <td className="px-6 py-2">
                  {currentVoiceId === voice.id && (
                    <span className="text-green-500">&#10003;</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default ProfileModal;
