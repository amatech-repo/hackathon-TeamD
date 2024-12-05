"use client";

import Link from "next/link";
import { redirect } from "next/navigation";

export default function MyPage() {
  async function deleteMe() {
    const res = await fetch("/api/users/me", {
      method: "DELETE",
      redirect: "follow",
    });
    if (res.redirected) {
      redirect(res.url);
    }
  }
  async function aboutMe() {
    const res = await fetch("/api/users/me", {
      method: "GET",
    });
    const json = await res.json();
    console.log(json.props);
    alert(json.props);
  }
  async function updateMe() {
    const res = await fetch("/api/users/me", {
      method: "PUT",
      body: JSON.stringify({ name: "new name" }),
    });
    const json = await res.json();
    alert(JSON.stringify(json));
  }
  return (
    <div>
      <h1>My Page</h1>
      <div>
        <p>My Page</p>
      </div>
      <div>
        <button type="button" onClick={deleteMe}>
          Check Delete Me
        </button>
      </div>
      <div>
        <button type="button" onClick={aboutMe}>
          Check About Me
        </button>
      </div>
      <div>
        <button type="button" onClick={updateMe}>
          Check Update Me
        </button>
      </div>
      <div>
        <Link href="/">Index</Link>
      </div>
    </div>
  );
}
