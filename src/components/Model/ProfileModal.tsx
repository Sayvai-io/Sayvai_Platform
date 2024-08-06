// components/ProfileModal.tsx
import React from 'react';
import Image from 'next/image';
import Modal from 'react-modal'; // Import the react-modal package

// Optional: Add styles for the modal

// Define the ProfileModal component
const ProfileModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Profile Modal"
      className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-lg max-w-xl w-full">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold">Profile</h2>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <p className="px-4 pb-4">This is your profile modal content.</p>

        <table className="w-full table-auto mb-4">
          <thead>
            <tr className="bg-[#e9e8e8]">
              <th className="px-6 py-2 text-left">Name</th>
              <th className="px-6 py-2 text-left">VoiceID</th>
              <th className="px-6 py-2 text-left">LanguageID</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-6 py-2 flex items-center">
                <span className="h-10 w-10 rounded-full mr-2">
                  <Image
                    width={40}
                    height={40}
                    src={"/images/user/user-01.png"}
                    alt="User"
                    className="rounded-full"
                  />
                </span>
                John Doe
              </td>
              <td className="px-6 py-2">12345</td>
              <td className="px-6 py-2">en-US</td>
            </tr>
            <tr className="border-b">
              <td className="px-6 py-2 flex items-center">
                <span className="h-10 w-10 rounded-full mr-2">
                  <Image
                    width={40}
                    height={40}
                    src={"/images/user/user-01.png"}
                    alt="User"
                    className="rounded-full"
                  />
                </span>
                Jane Smith
              </td>
              <td className="px-6 py-2">67890</td>
              <td className="px-6 py-2">fr-FR</td>
            </tr>
            <tr className="border-b">
              <td className="px-6 py-2 flex items-center">
                <span className="h-10 w-10 rounded-full mr-2">
                  <Image
                    width={40}
                    height={40}
                    src={"/images/user/user-01.png"}
                    alt="User"
                    className="rounded-full"
                  />
                </span>
                Alice Johnson
              </td>
              <td className="px-6 py-2">54321</td>
              <td className="px-6 py-2">de-DE</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default ProfileModal;
