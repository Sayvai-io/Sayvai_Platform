// src/components/Switchers/Language.tsx

"use client";

import React, { useState, useEffect } from "react";
import { BASE_URL } from "@/utils/constants";

interface LanguageProps {
  agent_id: string;
  onChange: (newValue: { id: string; name: string }) => void;
}

const Language: React.FC<LanguageProps> = ({ agent_id, onChange }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [languages, setLanguages] = useState<{ id: string; name: string }[]>(
    [],
  );

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const session = localStorage.getItem("supabaseSession");
        if (!session) {
          throw new Error("No session found");
        }
        const { access_token } = JSON.parse(session);

        const response = await fetch(`${BASE_URL}/get_languages`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        const data = await response.json();
        const languageList = data.map(
          (item: { id: string; language: string }) => ({
            id: item.id,
            name: item.language,
          }),
        );
        setLanguages(languageList);

        // Fetch agent language after fetching the list of languages
        const agentResponse = await fetch(`${BASE_URL}/get_stt_configuration`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify({ agent_id }),
        });
        const agentData = await agentResponse.json();
        const agentLanguage = languageList.find(
          (lang) => lang.id === agentData.language_id,
        );
        if (agentLanguage) {
          setSelectedLanguage(agentLanguage);
        }
      } catch (error) {
        console.error("Error fetching languages or agent language:", error);
      }
    };

    fetchLanguages();
  }, [agent_id]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = languages.find((lang) => lang.name === event.target.value);
    if (selected) {
      setSelectedLanguage(selected);
      onChange(selected);
    }
  };

  return (
    <div>
      <label className="text-md mb-3 block font-medium text-black dark:text-white">
        Language
      </label>
      <select
        value={selectedLanguage ? selectedLanguage.name : ""}
        onChange={handleChange}
        className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:text-white"
      >
        {languages.map((language) => (
          <option key={language.id} value={language.name}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Language;
