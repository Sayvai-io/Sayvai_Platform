import React, { useState, useEffect, useRef } from "react";
import DropdownUser from "../Header/DropdownUser";
import SelectProfile from "./SelectProfile/SelectProfile";

const TTS_Config: React.FC = () => {
    const [inputValue, setInputValue] = useState(""); // State to store the input value
    const [fixedWord, setFixedWord] = useState<string | null>(null); // State to store the fixed word
    const inputRef = useRef<HTMLInputElement>(null); // Ref to the input element
    const wordRef = useRef<HTMLDivElement>(null); // Ref to the word display area
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value); // Update the input value as the user types
    };
  
    const handleFixWord = () => {
      if (inputValue.trim() !== "") {
        setFixedWord(inputValue.trim()); // Set the fixed word
        setInputValue(""); // Clear the input value
      }
    };
  
    const handleEditWord = () => {
      setFixedWord(null); // Make the word editable again
    };
  
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        fixedWord === null
      ) {
        handleFixWord();
      }
    };
  
    useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    },);
  return (
    <div className="w-full rounded-2xl p-5 dark:border-strokedark dark:bg-boxdark xl:col-span-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center sm:mb-5">
        {/* Left side input box */}
        {fixedWord === null ? (
          <div className="flex items-center mb-4 sm:mb-0" ref={inputRef}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="border border-gray-300 px-3 py-1 rounded-md mr-2 w-full sm:w-auto"
              placeholder="Enter word"
            />
            <svg
              onClick={handleFixWord}
              viewBox="0 -960 960 960"
              className="cursor-pointer w-6 h-6 text-gray-700"
            >
              <path d="M120-120v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm584-528 56-56-56-56-56 56 56 56Z" />
            </svg>
          </div>
        ) : (
          <div className="flex items-center mb-4 sm:mb-0" ref={wordRef}>
            <p className="mt-2 mr-2 text-xl sm:text-2xl">
              <strong>{fixedWord}</strong>
            </p>
            <svg
              onClick={handleEditWord}
              viewBox="0 -960 960 960"
              className="cursor-pointer w-5 h-5 text-gray-700 mt-2"
            >
              <path d="M120-120v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm584-528 56-56-56-56-56 56 56 56Z" />
            </svg>
          </div>
        )}
        
        {/* Right side buttons and icons */}
        <div className="flex flex-wrap sm:flex-nowrap gap-2">
          <button className="flex items-center bg-white hover:bg-green-600 text-black border border-black px-2 py-1 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className="w-5 h-5 mr-2"
            >
              <path d="M480-80q-83 0-141.5-58.5T280-280v-360q-33 0-56.5-23.5T200-720v-80q0-33 23.5-56.5T280-880h400q33 0 56.5 23.5T760-800v80q0 33-23.5 56.5T680-640v360q0 83-58.5 141.5T480-80ZM280-720h400v-80H280v80Zm200 560q50 0 85-35t35-85H480v-80h120v-80H480v-80h120v-120H360v360q0 50 35 85t85 35ZM280-720v-80 80Z"/>
            </svg>
            Test LLM
          </button>
          <button className="flex items-center bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className="w-5 h-5 mr-2"
            >
              <path d="M760-482q0-117-81.5-198.5T480-762v-80q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-482h-80Zm-160 0q0-50-35-85t-85-35v-80q83 0 141.5 58.5T680-482h-80Zm198 362q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12Z"/>
            </svg>
            Test Audio
          </button>
          <button className="flex items-center bg-green-500 hover:bg-green-600 text-white px-1 py-1 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className="w-5 h-5"
            >
              <path d="m403-96-22-114q-23-9-44.5-21T296-259l-110 37-77-133 87-76q-2-12-3-24t-1-25q0-13 1-25t3-24l-87-76 77-133 110 37q19-16 40.5-28t44.5-21l22-114h154l22 114q23 9 44.5 21t40.5 28l110-37 77 133-87 76q2 12 3 24t1 25q0 13-1 25t-3 24l87 76-77 133-110-37q-19 16-40.5 28T579-210L557-96H403Zm77-240q60 0 102-42t42-102q0-60-42-102t-102-42q-60 0-102 42t-42 102q0 60 42 102t102 42Z"/>
            </svg>
          </button>
          <button className="flex items-center bg-[#b8f5a8] hover:bg-[#b8f5a8] text-white px-1 py-1 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#666666"
            className="cursor-pointer mt-1"
            onClick={() => alert("Button 1 clicked")}
          >
          <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm72-144h72v-336h-72v336Zm120 0h72v-336h-72v336Z"/>
          </svg>
          </button>
         
        </div>
        
      </div>
      <p className="mt-2 mr-2 mb-4 text-sm">Agent ID: a1c43e3c4d963fdce006e23bfcee9cea</p>
      <SelectProfile />
    </div>
  );
};

export default TTS_Config;
