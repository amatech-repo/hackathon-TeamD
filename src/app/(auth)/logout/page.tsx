"use client";

import Link from "next/link";

export default function LogoutPage() {
  async function isLogin() {
    const res = await fetch("/api/auth/status");
    const json = await res.json();
    alert(json.isValid);
  }
  return (
    <div>
      <h1> Logout Page</h1>
      <div>
        <Link href="/api/auth/logout">Logout</Link>
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
