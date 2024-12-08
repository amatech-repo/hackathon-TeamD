"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

async function fetchUser(id: string) {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) return undefined;
  const json = await res.json();
  return json.props;
}

export default function UserPage() {
  const params = useParams<{ userId: string }>();
  const userId = params.userId;
  const [userInfo, setUserInfo] = useState<{
    name: string;
    email: string;
    id: string;
  } | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchUser(userId);
      setUserInfo(data);
    }
    fetchData();
  }, [userId]);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Page: {userId}</h1>
      <div>
        <p>name: {userInfo.name} </p>
        <p>email: {userInfo.email} </p>
        <p>id: {userInfo.id}</p>
      </div>
    </div>
  );
}
