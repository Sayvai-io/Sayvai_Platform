import { useEffect, useState } from "react";

interface EndSessionProps {
  end_conversation_on_goodbye: boolean;
  onChange: (value: boolean) => void;
}

const EndSession: React.FC<EndSessionProps> = ({
  end_conversation_on_goodbye,
  onChange,
}) => {
  const [enabled, setEnabled] = useState(end_conversation_on_goodbye);

  return (
    <div className="flex items-center justify-between">
      <h6 className="text-sm font-bold">End Session With Goodbye</h6>
      <div>
        <label
          htmlFor="toggleEndSession"
          className="flex cursor-pointer select-none items-center"
        >
          <div className="relative">
            <input
              id="toggleEndSession"
              type="checkbox"
              className="sr-only"
              onChange={() => {
                setEnabled(!enabled);
                onChange(!enabled);
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
  );
};

export default EndSession;
