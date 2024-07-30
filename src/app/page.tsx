"use client";

import { Metadata } from "next";
import { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Signup from "@/components/Signup/page";
import Login from "@/components/Login/page";



export default function Home() {
  const [showSignup, setShowSignup] = useState(false);
  return (
    <>
      {showSignup ? (
        <Signup setShowSignup={setShowSignup} />
      ) : (
        <Login setShowSignup={setShowSignup} />
      )}
    </>
  );
}
