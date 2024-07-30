"use client";

import TTS_Config from "./TtsConfig";
import LLm_Config from "./LlmConfig";
import Stt_Config from "./SttConfig";
import PrivacySettings from "./PrivacySettings";

const FormElements = () => {
  return (
    <>
     
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
          
        <div className="sm:col-span-12 flex flex-col gap-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <TTS_Config />
          </div>
        </div>  
         
        <div className="sm:col-span-8 flex flex-col gap-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <LLm_Config />
          </div>
        </div>

        <div className="sm:col-span-4 flex flex-col gap-3">
          
        
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col gap-5.5 p-6.5">
              <PrivacySettings />
            </div>
          </div>

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <Stt_Config />
          </div>

        </div>
      </div>
    </>
  );
};

export default FormElements;
