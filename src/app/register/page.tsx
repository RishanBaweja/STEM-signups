"use client";

import { FormEvent } from "react";
import Navbar from "@/components/Navbar";

export default function Register() {
  async function submitData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const stemSubjects = String(formData.get("stemSubjects") ?? "")
      .split(",")
      .map((subject) => subject.trim())
      .filter(Boolean);

    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        role: formData.get("role"),
        educatorInfo: { stemSubjects },
      }),
    });
  }

  return (
    <>
      <Navbar />
      <main>
        <form id="register-form" onSubmit={submitData}>
          <h1 className="page-title">Register</h1>
          <label htmlFor="firstName">First name</label>
          <input type="text" id="firstName" name="firstName" />
          <label htmlFor="lastName">Last name</label>
          <input type="text" id="lastName" name="lastName" />
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
          <label htmlFor="role">Role</label>
          <input type="text" id="role" name="role" />
          <label htmlFor="stemSubjects">STEM subjects</label>
          <input type="text" id="stemSubjects" name="stemSubjects" placeholder="For example: Biology, Chemistry" />
          <input type="submit" value="Register" />
        </form>
      </main>
      <footer className="footer">© 2026 STEM Signups | All Rights Reserved</footer>
    </>
  );
}
