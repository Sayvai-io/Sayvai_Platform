"use client";
import SwitcherFour from "../Switchers/SwitcherFour";
import VoiceTemperature from "../Switchers/VoiceTemperature";
import SwitcherThree from "../Switchers/SwitcherThree";
import SwitcherTwo from "../Switchers/SwitcherTwo";
import React, { useState } from "react";
import Usebackchannels from "../Switchers/Usebackchannels";
import EndSession from "../Switchers/EndSession";
import InterptSensitivity from "../Switchers/InterptSensitivity";



const Stt_Config = () => {
  
  const [volume, setVolume] = useState(0.05);
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(event.target.value));
  };

 

    return (
      <>
       <div className="border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-bold">Advanced Setting</h3>
            <p className="text-sm mt-1">
             Explore more in <a href="#" className="underline text-[#33a299]">API reference</a>.
             </p>
            </div>
            

            <div className="flex flex-col gap-5.5 p-6.5">
              <VoiceTemperature volume={volume} handleVolumeChange={handleVolumeChange} />
              <Usebackchannels />
              <EndSession />
              < InterptSensitivity />
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