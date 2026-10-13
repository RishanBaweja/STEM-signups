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
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
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

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const searchQuery = search.trim().toLowerCase();

    const matchesName = fullName.includes(searchQuery);
    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesName && matchesRole;
  });

  if (error) return <p>{error}</p>;
  if (isLoading) return <p>Loading users...</p>;
  if (users.length === 0) return <p>No users found.</p>;

  return (
    <>
      <div className="user-filters">
        <label htmlFor="user-search">Search by name</label>
        <input
          type="text"
          id="user-search"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <label htmlFor="role-filter">Filter by role</label>
        <select id="role-filter" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="all">All roles</option>
          <option value="educator">Educator</option>
          <option value="admin">Admin</option>
        </select>
      </div>

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
          {filteredUsers.map((user) => (
            <User key={user.username} user={user} />
          ))}
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan={6}>No matching users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
