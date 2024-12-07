import React, { useState } from "react";

interface UserProfileProps {
  onDelete: () => void;
}

export default function UserProfile({ onDelete }: UserProfileProps) {
  const [username, setUsername] = useState("ユーザー名");

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">プロフィール</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">ユーザー名</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">ID</label>
        <input
          type="text"
          value="12345"
          disabled
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Eメール</label>
        <input
          type="email"
          value="user@example.com"
          disabled
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
        />
      </div>
      <button
        onClick={onDelete}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        ユーザー削除
      </button>
    </div>
  );
}
