"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/app/lib/api";

type Profile = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
};

export default function ProfileByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [status, setStatus] = useState("Loading...");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const run = async () => {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        setStatus("No token found. Please login.");
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/api/profiles/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error();

        const data: Profile = await res.json();
        setProfile(data);
        setStatus("");
      } catch {
        setStatus("Unable to load profile.");
      }
    };

    run();
  }, [id]);

  const handleDelete = async () => {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      setStatus("No token found. Please login.");
      return;
    }

    setDeleting(true);
    setStatus("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/profiles/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();

      const data: { message: string } = await res.json();

      setStatus(data.message || "Profile deleted successfully");

      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    } catch {
      setStatus("Failed to delete profile.");
      setDeleting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-xl font-semibold">Profile Details</h1>
      <p className="mt-1 text-sm text-gray-600">ID: {id}</p>

      {status && <p className="mt-6 text-sm text-gray-700">{status}</p>}

      {profile && (
        <div className="mt-6 rounded-lg border bg-white p-4 text-sm space-y-2">
          <p>
            <span className="font-medium">Name:</span> {profile.name}
          </p>
          <p>
            <span className="font-medium">Email:</span> {profile.email}
          </p>
          <p>
            <span className="font-medium">ID:</span> {profile.id}
          </p>
          <p className="text-xs text-gray-500">
            Created: {new Date(profile.createdAt).toLocaleString()}
          </p>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="mt-4 w-full rounded-md border border-red-600 bg-red-600 px-4 py-2 text-sm font-medium text-white"
          >
            {deleting ? "Deleting..." : "Delete Profile"}
          </button>
        </div>
      )}
    </main>
  );
}
