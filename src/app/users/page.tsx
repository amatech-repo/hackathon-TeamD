"use client";

import Link from "next/link";

export default function UsersPage() {
  async function getUsers() {
    const res = await fetch("/api/users");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const json: any[] = await res.json();
    const datas = json.map((data) => data.props);
    console.log(datas);
    alert(JSON.stringify(datas));
  }
  return (
    <div>
      <h1>Users Page</h1>
      <div>
        <button type="button" onClick={getUsers}>
          Check Users
        </button>
      </div>
      <div>
        <Link href="/">Index</Link>
      </div>
    </div>
  );
}
