"use client";

import SelectGroupOne from "../SelectGroup/SelectGroupOne";
import SelectGroupTwo from "../SelectGroup/SelectGroupTwo";

const LLm_Config = () => {
    return (
      <>
      <div className=" border-stroke px-6.5 py-4 dark:border-strokedark">
            <h2 className="text-2xl font-bold">Single-Prompt Agent</h2>
            <p className="text-xs"> llm url: wss://api.retellai.com/retell-llm- new/cf7c38a53b5f0f33984fa2f6b11d31a5 </p>
           
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
            <div>
                <label className="mb-3 block text-md font-medium text-black dark:text-white">
                Initial Message
                </label>
                <textarea
                  rows={2}
                  placeholder="Default textarea"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-[#16C3A6] active:border-[#16C3A6] disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-[#16C3A6]"
                ></textarea>
             </div>
             <div>
                <label className="mb-3 block text-md font-medium text-black dark:text-white">
                Agent Prompt
                </label>
                <textarea
                  rows={6}
                  placeholder="Default textarea"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-[#16C3A6] active:border-[#16C3A6] disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-[#16C3A6]"
                ></textarea>
              </div>

              <div>
                <label className="mb-3 block text-md font-medium text-black dark:text-white">
                  LLM Option
                </label>
                <div className="flex flex-col gap-5.5 p-0">
                 <SelectGroupOne />
                      
                 </div>
              </div>

              <div>
                <label className="mb-3 block text-md font-medium text-black dark:text-white">
                 Who Speaks First
                </label>
                <div className="flex flex-col gap-5.5 p-0">
                <SelectGroupTwo />       
                 </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Disabled label
                </label>
                <input
                  type="text"
                  placeholder="Disabled label"
                  disabled
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                />
              </div>
            </div>
      </>
  );
};

export default LLm_Config;