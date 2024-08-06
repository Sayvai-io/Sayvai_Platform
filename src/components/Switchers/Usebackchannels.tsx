import { useEffect, useState } from "react";

interface UsebackchannelsProps {
  use_backchannels: boolean;
}

const Usebackchannels: React.FC<UsebackchannelsProps> = ({
  use_backchannels,
}) => {
  const [enabled, setEnabled] = useState(use_backchannels);
  const [optOut, setOptOut] = useState(false); // New state variable

  useEffect(() => {
    console.log("Midhun");
    console.log(enabled);
    console.log("Midhun");
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h6 className="text-sm font-bold">Use backchannels</h6>
        <div>
          <label
            htmlFor="toggleBackchannels"
            className="flex cursor-pointer select-none items-center"
          >
            <div className="relative">
              <input
                id="toggleBackchannels"
                type="checkbox"
                className="sr-only"
                onChange={() => {
                  setEnabled(!enabled);
                }}
              />
              <div className="h-3 w-9 rounded-full bg-meta-9 shadow-inner dark:bg-[#5A616B]"></div>
              <div
                className={`dot absolute -top-1 left-0 h-5 w-5 rounded-full bg-white shadow-switch-1 transition ${
                  enabled &&
                  "!right-0 !translate-x-full !bg-[#16C3A6] dark:!bg-white"
                }`}
              ></div>
            </div>
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h6 className="text-sm font-bold">
          Opt-Out of Personal Sensitive Data
        </h6>
        <div>
          <label
            htmlFor="toggleOptOut"
            className="flex cursor-pointer select-none items-center"
          >
            <div className="relative">
              <input
                id="toggleOptOut"
                type="checkbox"
                className="sr-only"
                onChange={() => {
                  setOptOut(!optOut);
                }}
              />
              <div className="h-3 w-9 rounded-full bg-meta-9 shadow-inner dark:bg-[#5A616B]"></div>
              <div
                className={`dot absolute -top-1 left-0 h-5 w-5 rounded-full bg-white shadow-switch-1 transition ${
                  optOut &&
                  "!right-0 !translate-x-full !bg-[#16C3A6] dark:!bg-white"
                }`}
              ></div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Usebackchannels;
