"use client";

import { useState } from "react";
import Signup from "@/components/Signup/page";
import Login from "@/components/Login/page";
// import dotenv from "dotenv";
// dotenv.config();

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
