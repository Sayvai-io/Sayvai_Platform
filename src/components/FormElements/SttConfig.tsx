// src/components/FormElements/SttConfig.tsx

"use client";
import SwitcherFour from "../Switchers/SwitcherFour";
import VoiceTemperature from "../Switchers/VoiceTemperature";
import SwitcherThree from "../Switchers/SwitcherThree";
import SwitcherTwo from "../Switchers/SwitcherTwo";
import React, { useDebugValue, useEffect, useState } from "react";
import Usebackchannels from "../Switchers/Usebackchannels";
import EndSession from "../Switchers/EndSession";
import InterptSensitivity from "../Switchers/InterptSensitivity";
import Language from "@/components/Switchers/Language";
import { BASE_URL } from "@/utils/constants";

interface Stt_ConfigProps {
  agent_id: string;
  use_backchannels: boolean;
  end_conversation_on_goodbye: boolean;
  interrupt_sensitivity: string;
  language: string;
  language_id: string;
}

const Stt_Config: React.FC<Stt_ConfigProps> = ({
  agent_id,
  use_backchannels,
  end_conversation_on_goodbye,
  interrupt_sensitivity,
  language,
  language_id,
}) => {
  const [useBackchannels, setUseBackchannels] = useState(use_backchannels);
  const [endConversationOnGoodbye, setEndConversationOnGoodbye] = useState(
    end_conversation_on_goodbye,
  );
  const [interruptSensitivity, setInterruptSensitivity] = useState(
    interrupt_sensitivity,
  );
  const [languages, setLanguages] = useState(language);
  const [languageId, setLanguageId] = useState(language_id);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setUseBackchannels(use_backchannels);
    setEndConversationOnGoodbye(end_conversation_on_goodbye);
    setInterruptSensitivity(interrupt_sensitivity);
    setLanguages(language);
    setLanguageId(language_id);
  }, [
    use_backchannels,
    end_conversation_on_goodbye,
    interrupt_sensitivity,
    language,
    language_id,
  ]);

  const handleUseBackchannelsChange = (newValue: boolean) => {
    setUseBackchannels(newValue);
    setIsDirty(true);
  };

  const handleEndConversationOnGoodbyeChange = (newValue: boolean) => {
    setEndConversationOnGoodbye(newValue);
    setIsDirty(true);
  };

  const handleInterruptSensitivityChange = (newValue: string) => {
    setInterruptSensitivity(newValue);
    setIsDirty(true);
  };

  const handleLanguageChange = (newValue: { id: string; name: string }) => {
    setLanguages(newValue.name);
    setLanguageId(newValue.id);
    setIsDirty(true);
  };

  const handleSave = async () => {
    try {
      const session = localStorage.getItem("supabaseSession");
      if (!session) {
        throw new Error("No session found");
      }
      const { access_token } = JSON.parse(session);

      const newConfig: { [key: string]: any } = {};
      if (useBackchannels !== use_backchannels) {
        newConfig.use_backchannels = useBackchannels;
      }
      if (endConversationOnGoodbye !== end_conversation_on_goodbye) {
        newConfig.end_conversation_on_goodbye = endConversationOnGoodbye;
      }
      if (interruptSensitivity !== interrupt_sensitivity) {
        newConfig.interrupt_sensitivity = interruptSensitivity;
      }

      // Update language
      if (languageId !== language_id) {
        await fetch(`${BASE_URL}/update_stt_configuration`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify({
            agent_id,
            new_config: { language_id: languageId },
          }),
        });
      }

      // Update other configurations
      if (Object.keys(newConfig).length > 0) {
        await fetch(`${BASE_URL}/change_llm_configurations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify({ agent_id, new_config: newConfig }),
        });
      }

      setIsDirty(false);
    } catch (error) {
      console.error("Error updating STT configuration:", error);
    }
  };

  return (
    <>
      <div className="border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-bold">Advanced Setting</h3>
        <p className="mt-1 text-sm">
          Explore more in{" "}
          <a href="#" className="text-[#33a299] underline">
            API reference
          </a>
          .
        </p>
      </div>

      <div className="flex flex-col gap-5.5 p-6.5">
        <Usebackchannels
          use_backchannels={useBackchannels}
          onChange={handleUseBackchannelsChange}
        />
        <EndSession
          end_conversation_on_goodbye={endConversationOnGoodbye}
          onChange={handleEndConversationOnGoodbyeChange}
        />
        <InterptSensitivity
          interrupt_sensitivity={interruptSensitivity}
          onChange={handleInterruptSensitivityChange}
        />
        <Language agent_id={agent_id} onChange={handleLanguageChange} />
      </div>

      {isDirty && (
        <button
          onClick={handleSave}
          className="mt-4 rounded bg-[#16C3A6] px-4 py-2 text-white"
        >
          Save
        </button>
      )}
    </>
  );
};

export default Stt_Config;
