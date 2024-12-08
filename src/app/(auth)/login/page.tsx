import React from "react";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 pb-20 gap-16 sm:p-20 bg-gray-100 font-sans">
      <h1 className="text-2xl font-bold mb-8">ログイン</h1>
      <form className="flex flex-col gap-4 w-full max-w-md">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium">
            メールアドレス
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="p-2 border rounded"
            placeholder="example@example.com"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-medium">
            パスワード
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="p-2 border rounded"
            placeholder="********"
            required
          />
        </div>
        <div></div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          ログイン
        </button>
      </form>
=======
"use client";

import Link from "next/link";

export default function LoginPage() {
  async function isLogin() {
    const res = await fetch("/api/auth/status");
    const json = await res.json();
    alert(json.isValid);
  }
  return (
    <div>
      <h1>Login Page</h1>
      <div>
        <Link href="/api/auth/login/google">LoginWithGoogle</Link>
      </div>
      <div>
        <Link href="/api/auth/login/discord">LoginWithDiscord</Link>
      </div>
      <div>
        <button type="button" onClick={isLogin}>
          Check Login
        </button>
      </div>
      <div>
        <Link href="/">Index</Link>
      </div>
    </div>
  );
}
