"use client";

import { FormEvent, useState } from "react";
import Navbar from "@/components/Navbar";

type ApiError = {
  error?: string;
  field?: "username" | "email";
};

type FieldErrors = Partial<Record<"username" | "email", string>>;

export default function Register() {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const stemSubjects = String(formData.get("stemSubjects") ?? "")
      .split(",")
      .map((subject) => subject.trim())
      .filter(Boolean);

    setFieldErrors({});
    setFormError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/users", {
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

      const result: ApiError = await response.json().catch(() => ({}));
      if (!response.ok) {
        if (response.status === 409 && result.field === "username") {
          setFieldErrors({ username: result.error ?? "Username already exists." });
        } else if (response.status === 409 && result.field === "email") {
          setFieldErrors({ email: result.error ?? "Email already exists." });
        } else {
          setFormError(result.error ?? "Unable to register. Please try again later.");
        }
        return;
      }
      form.reset();
      setSuccessMessage("Registration successful!");
    } catch {
      setFormError("Unable to register. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <form id="register-form" onSubmit={submitData}>
          <h1 className="page-title">Register</h1>
          {formError && <p className="error">{formError}</p>}
          {successMessage && <p className="success">{successMessage}</p>}

          <label htmlFor="firstName">First name</label>
          <input type="text" id="firstName" name="firstName" />

          <label htmlFor="lastName">Last name</label>
          <input type="text" id="lastName" name="lastName" />

          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            aria-invalid={Boolean(fieldErrors.username)}
            aria-describedby={fieldErrors.username ? "username-error" : undefined}
          />
          {fieldErrors.username && (
            <p id="username-error" className="error">
              {fieldErrors.username}
            </p>
          )}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          {fieldErrors.email && (
            <p id="email-error" className="error">
              {fieldErrors.email}
            </p>
          )}

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
          <label htmlFor="role">Role</label>
          <input type="text" id="role" name="role" />
          <label htmlFor="stemSubjects">STEM subjects</label>
          <input type="text" id="stemSubjects" name="stemSubjects" placeholder="For example: Biology, Chemistry" />
          <input type="submit" value={isSubmitting ? "Registering..." : "Register"} disabled={isSubmitting} />
        </form>
      </main>
      <footer className="footer">© 2026 STEM Signups | All Rights Reserved</footer>
    </>
  );
}
