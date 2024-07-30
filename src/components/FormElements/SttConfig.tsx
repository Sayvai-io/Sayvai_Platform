"use client";
import SwitcherFour from "../Switchers/SwitcherFour";
import SwitcherOne from "../Switchers/SwitcherOne";
import SwitcherThree from "../Switchers/SwitcherThree";
import SwitcherTwo from "../Switchers/SwitcherTwo";

const Stt_Config = () => {
    return (
      <>
       <div className="border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-bold">Advanced Setting</h3>
            <p className="text-sm mt-1">
             Explore more in <a href="#" className="underline text-[#33a299]">API reference</a>.
             </p>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <SwitcherOne />
              <SwitcherTwo />
              <SwitcherThree />
              <SwitcherFour />
            </div>
      </>
  );
};

export default Stt_Config;