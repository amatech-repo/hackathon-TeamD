import React from "react";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 pb-20 gap-16 sm:p-20 bg-gray-100 font-sans">
      <h1 className="text-2xl font-bold mb-8">ログイン</h1>
      {/* <div>
        <Link href="/api/auth/login/google">LoginWithGoogle</Link>
      </div>
      <div>
        <Link href="/api/auth/login/discord">LoginWithDiscord</Link>
      </div> */}
      
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          ログイン
        </button>
    </div>
  );
}
