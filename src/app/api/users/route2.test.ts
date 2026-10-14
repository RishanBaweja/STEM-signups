import { describe, expect, test, vi, beforeEach } from "vitest";
import { GET } from "./route";

const { mockFind, mockSelect } = vi.hoisted(() => {
  return {
    mockFind: vi.fn(),
    mockSelect: vi.fn(),
  };
});

vi.mock("@/database/userSchema", () => ({
  default: {
    find: mockFind,
  },
}));

vi.mock("@/database/db", () => ({
  default: vi.fn().mockResolvedValue({}),
}));

describe("GET /api/users", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockFind.mockImplementation(() => ({
      select: mockSelect,
    }));
  });
  test("One user is retrived", async () => {
    const mockUsers = [
      {
        _id: "6abc768b4f5e0032f24d0dda",
        firstName: "Whois",
        lastName: "Jason",
        username: "WhoIsJSON",
        email: "who-is-json@gmail.com",
        password: "doNotCopyThisPassword123!",
        role: "educator",
      },
    ];

    mockSelect.mockResolvedValue(mockUsers);
    const response = await GET();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(mockUsers);
    expect(mockFind).toHaveBeenCalledOnce();
  });
  test("All users are retrived", async () => {
    const mockUsers = [
      {
        _id: "6abc768b4f5e0032f24d0dda",
        firstName: "Whois",
        lastName: "Jason",
        username: "WhoIsJSON",
        email: "who-is-json@gmail.com",
        password: "doNotCopyThisPassword123!",
        role: "educator",
      },
      {
        _id: "6abc768b4f5e0032f24d0daa",
        firstName: "abc",
        lastName: "123",
        username: "abc123",
        email: "abc123@gmail.com",
        password: "password!",
        role: "admin",
      },
    ];

    mockSelect.mockResolvedValue(mockUsers);
    const response = await GET();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(mockUsers);
    expect(mockFind).toHaveBeenCalledOnce();
  });

  test("No users returns empty array", async () => {
    mockSelect.mockResolvedValue([]);

    const response = await GET();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual([]);
    expect(mockFind).toHaveBeenCalledOnce();
  });
});
