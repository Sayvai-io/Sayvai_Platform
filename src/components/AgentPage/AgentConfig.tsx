"use client";
import React from "react";
import dynamic from "next/dynamic";
import FormElements from "../FormElements";


const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const AgentConfig: React.FC = () => {

  return (
    <div className="col-span-12 rounded-sm  px-0 pb-0 pt-0 shadow-default dark:border-strokedark  sm:px-0 xl:col-span-9">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
      <FormElements />
   
        
      </div>
    </div>
  );
};

export default AgentConfig;
