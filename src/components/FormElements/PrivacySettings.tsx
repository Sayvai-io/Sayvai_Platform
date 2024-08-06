import SwitcherTwo from "../Switchers/SwitcherTwo";

const PrivacySettings = () => {
  return (
    <div>
      <div className=" dark:border-strokedark dark:bg-boxdark">
        <h2 className="font-bold">Privacy Settings</h2>
        <p className="mt-2 text-sm">
          Explore more in the{" "}
          <a href="#" className="text-[#33a299] underline">
            privacy documentation
          </a>
          .
        </p>

        <div className="mt-5 flex items-center justify-between">
          <h6 className="text-sm ">Opt-Out of Personal Sensitive Data</h6>
          <SwitcherTwo />
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;
