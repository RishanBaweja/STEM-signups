import { describe, expect, test, vi } from "vitest";

vi.mock("@/database/db", () => ({
  default: async () => ({}),
}));

vi.mock("@/database/userSchema", () => ({
  default: Object.assign(
    class User {
      async save() {}
    },
    { exists: async () => null },
  ),
}));

import { POST } from "./route";

const user = {
  firstName: "jonah",
  lastName: "depaz",
  username: "jd100",
  email: "jd100@test.com",
  password: "I-hate-calpoly-100",
  role: "admin",
};

function createRequest(body = user) {
  return new Request("http://localhost/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/users", () => {
  test("creates a user", async () => {
    const response = await POST(createRequest());

    expect(response.status).toBe(201);
  });

  test("creates another user", async () => {
    const response = await POST(createRequest({ ...user, username: "BigJ", email: "BigJ@test.com" }));

    expect(response.status).toBe(201);
  });

  test("Success!", async () => {
    const response = await POST(createRequest());

    await expect(response.json()).resolves.toEqual({ message: "User Creation Successful" });
  });
});
