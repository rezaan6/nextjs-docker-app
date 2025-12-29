"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "../lib/api";

type Profile = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
};

export default function ProfileListPage() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    const run = async () => {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        setStatus("No token found. Please login.");
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/api/profiles`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Fetch failed");

        const data: { count: number; profiles: Profile[] } = await res.json();
        setProfiles(data.profiles);
        setStatus("");
      } catch {
        setStatus("Unable to load profiles.");
      }
    };

    run();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-xl font-semibold">Profiles</h1>

      {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}

      {!status && profiles.length === 0 && (
        <p className="mt-4 text-sm text-gray-700">No profiles found.</p>
      )}

      <div className="mt-6 space-y-2">
        {profiles.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => router.push(`/profile/${p.id}`)}
            className="w-full text-left rounded-lg border bg-white p-4"
          >
            <p className="text-sm font-medium">{p.name}</p>
            <p className="text-sm text-gray-600">{p.email}</p>
            <p className="text-xs text-gray-500 mt-1">{p.id}</p>
          </button>
        ))}
      </div>
    </main>
  );
}
