"use client";
import SwitcherFour from "../Switchers/SwitcherFour";
import VoiceTemperature from "../Switchers/VoiceTemperature";
import SwitcherThree from "../Switchers/SwitcherThree";
import SwitcherTwo from "../Switchers/SwitcherTwo";
import React, { useState } from "react";
import Usebackchannels from "../Switchers/Usebackchannels";
import EndSession from "../Switchers/EndSession";
import InterptSensitivity from "../Switchers/InterptSensitivity";
import Language from "@/components/Switchers/Language";

interface Stt_ConfigProps {
  sttConfig: {
    use_backchannels: boolean;
    end_conversation_on_goodbye: boolean;
  };
}

const Stt_Config: React.FC<Stt_ConfigProps> = ({ sttConfig }) => {
  const [volume, setVolume] = useState(0.05);
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(event.target.value));
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
        <VoiceTemperature
          volume={volume}
          handleVolumeChange={handleVolumeChange}
        />
        <Usebackchannels {...sttConfig} />
        <EndSession {...sttConfig} />
        <InterptSensitivity />
        <Language />
        {/* <div className="flex items-center justify-between">
                  <h6 className="text-sm ">Use backchannels</h6>
                  <SwitcherTwo />
              </div>
              <div className="flex items-center justify-between">
                  <h6 className="text-sm ">End Session with Good bye</h6>
                  <SwitcherTwo />
              </div> */}
      </div>
    </>
  );
};

export default Stt_Config;
