import { beforeEach, describe, expect, test, vi } from "vitest";

const { mockFind } = vi.hoisted(() => ({
  mockFind: vi.fn(),
}));

vi.mock("@/database/db", () => ({
  default: vi.fn(async () => ({})),
}));

vi.mock("@/database/eventSchema", () => ({
  default: {
    find: mockFind,
  },
}));

import { GET } from "./route";

describe("GET /api/events", () => {
  beforeEach(() => {
    mockFind.mockReset();
  });

  test("returns events when events exist", async () => {
    const fakeEvents = [
      { _id: "event1", eventSubject: ["Robotics"] },
      { _id: "event2", eventSubject: ["Geometry"] },
    ];

    mockFind.mockResolvedValue(fakeEvents);

    const response = await GET();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(fakeEvents);
    expect(mockFind).toHaveBeenCalledOnce();
  });

  test("returns an empty array when no events exist", async () => {
    mockFind.mockResolvedValue([]);

    const response = await GET();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual([]);
    expect(mockFind).toHaveBeenCalledOnce();
  });

  test("throws an error when the database query fails", async () => {
    mockFind.mockRejectedValue(new Error("Database query failed"));

    await expect(GET()).rejects.toThrow("Database query failed");
    expect(mockFind).toHaveBeenCalledOnce();
  });
});
