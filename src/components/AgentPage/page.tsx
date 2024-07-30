
"use client";

import React,{ useState } from "react";
import AddAgent from "./AddAgent";
import NoAgent from "@/components/AgentPage/NoAgent";
import AgentConfig from "./AgentConfig";


const AgentPage: React.FC = () => {
  const [showAdditionalCharts, setShowAdditionalCharts] = useState(false);
  const handleCloseModal = () => {
    setShowAdditionalCharts(true);
  };
  return (
    <>
    

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-0 md:gap-3 2xl:mt-7.5 2xl:gap-7.5">
       
        <AddAgent onCloseModal={handleCloseModal}/>
     
        {showAdditionalCharts ? (
          
            <AgentConfig />
        
        ) : (
          
            <NoAgent />
        
        )}
       
      </div>
    </>
  );
};

export default AgentPage;





