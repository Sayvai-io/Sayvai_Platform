"use client";

import React, { useState, useEffect } from "react";
import { BASE_URL } from "@/utils/constants";

const Language: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch(`${BASE_URL}/get_languages`);
        const data = await response.json();
        const languageList = data.map(
          (item: { language: string }) => item.language,
        );
        setLanguages(languageList);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };

    fetchLanguages();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <div>
      <label className="text-md mb-3 block font-medium text-black dark:text-white">
        Language
      </label>
      <select
        value={selectedLanguage}
        onChange={handleChange}
        className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:text-white"
      >
        {languages.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Language;
