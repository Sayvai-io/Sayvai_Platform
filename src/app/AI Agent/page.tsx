import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import AgentPage from "@/components/AgentPage/page";

export const metadata: Metadata = {
  title: "Sayvai_Platform",
  description:
    "Sayvai_Platform",
};

const AiAgentPage: React.FC = () => {
  return (
    <DefaultLayout>
      <AgentPage />
    </DefaultLayout>
  );
};

export default AiAgentPage;
