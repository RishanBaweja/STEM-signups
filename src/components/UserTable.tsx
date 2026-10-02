"use client";

import { useEffect, useState } from "react";
import User from "@/components/User";

type UserData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: "educator" | "admin";
  educatorInfo?: {
    isVerified: boolean;
    stemSubjects: string[];
  };
};

export default function UsersTable() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/users");

        if (!response.ok) {
          throw new Error("Unable to load users.");
        }

        setUsers(await response.json());
      } catch {
        setError("Unable to load users.");
      } finally {
        setIsLoading(false);
      }
    }

    void fetchUsers();
  }, []);

  if (error) return <p>{error}</p>;
  if (isLoading) return <p>Loading users...</p>;
  if (users.length === 0) return <p>No users found.</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>STEM subjects</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <User key={user.username} user={user} />
        ))}
      </tbody>
    </table>
  );
}
