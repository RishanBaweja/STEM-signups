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
