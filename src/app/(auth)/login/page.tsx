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
