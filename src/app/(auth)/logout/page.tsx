"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
// import { logoutUser } from '../../features/auth/logout';

export default function LogoutPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold">ログアウト中...</h1>
      <p>しばらくお待ちください。</p>
    </div>
  );
}
