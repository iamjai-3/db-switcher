import { Pool } from "pg";
import { getPostgresConnection } from "../src/database/postgres";

jest.mock("pg", () => {
  const mPool = {
    connect: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

describe("PostgreSQL Connection", () => {
  const mockPool = {
    connect: jest.fn(),
  };

  beforeEach(() => {
    (Pool as jest.MockedClass<typeof Pool>).mockImplementation(
      () => mockPool as any
    );
  });

  it("should create a new Pool instance if it does not exist", async () => {
    const dbConfig = {
      user: "admin",
      password: "password",
      host: "localhost",
      database: "test",
      port: 5432,
    };

    const connection = await getPostgresConnection(dbConfig);
    expect(Pool).toHaveBeenCalledWith(dbConfig);
    expect(connection).toBe(mockPool);
  });

  it("should reuse existing Pool instance if it exists", async () => {
    const dbConfig = {
      user: "admin",
      password: "password",
      host: "localhost",
      database: "test",
      port: 5432,
    };

    // Initial call to create Pool
    await getPostgresConnection(dbConfig);

    // Second call should reuse the existing Pool
    const connection = await getPostgresConnection(dbConfig);
    expect(Pool).toHaveBeenCalledTimes(1); // Should be called only once
    expect(connection).toBe(mockPool);
  });

  it("should handle errors during connection", async () => {
    const dbConfig = {};

    (Pool as jest.MockedClass<typeof Pool>).mockImplementation(() => {
      throw new Error("Connection error");
    });

    await expect(getPostgresConnection(dbConfig)).rejects.toThrow(
      "PostgreSQL connection failed: Connection error"
    );
  });
});
