import { useState } from "react";

const EndSession = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center justify-between">
    <h6 className="text-sm font-bold ">End Session With Good Bye</h6>
   
     <div x-data="{ switcherToggle: false }">
      <label
        htmlFor="toggle2"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            id="toggle2"
            type="checkbox"
            className="sr-only"
            onChange={() => {
              setEnabled(!enabled);
            }}
          />
          <div className="h-3 w-9 rounded-full bg-meta-9 shadow-inner dark:bg-[#5A616B]"></div>
          <div
            className={`dot absolute -top-1 left-0 h-5 w-5 rounded-full bg-white shadow-switch-1 transition ${
              enabled && "!right-0 !translate-x-full !bg-[#16C3A6] dark:!bg-white"
            }`}
          ></div>
        </div>
      </label>
    </div>
   </div>
  );
};

export default EndSession;
