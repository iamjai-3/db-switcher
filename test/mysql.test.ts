import mysql from "mysql2/promise";
import { getMySQLConnection } from "../src/database/mysql";

jest.mock("mysql2/promise", () => {
  const mPool = {};
  return { createPool: jest.fn(() => mPool) };
});

describe("MySQL Connection", () => {
  const mockPool = {};

  beforeEach(() => {
    (
      mysql.createPool as jest.MockedFunction<typeof mysql.createPool>
    ).mockImplementation(() => mockPool as any);
  });

  it("should create a new Pool instance if it does not exist", async () => {
    const dbConfig = {
      user: "root",
      password: "password",
      host: "localhost",
      database: "test_db",
      port: 3306,
    };

    const connection = await getMySQLConnection(dbConfig);
    expect(mysql.createPool).toHaveBeenCalledWith(dbConfig);
    expect(connection).toBe(mockPool);
  });

  it("should reuse existing Pool instance if it exists", async () => {
    const dbConfig = {
      user: "root",
      password: "password",
      host: "localhost",
      database: "test_db",
      port: 3306,
    };

    await getMySQLConnection(dbConfig);

    const connection = await getMySQLConnection(dbConfig);
    expect(mysql.createPool).toHaveBeenCalledTimes(1);
    expect(connection).toBe(mockPool);
  });

  it("should handle errors during connection", async () => {
    (
      mysql.createPool as jest.MockedFunction<typeof mysql.createPool>
    ).mockImplementation(() => {
      throw new Error("Connection error");
    });

    const dbConfig = {};

    await expect(getMySQLConnection(dbConfig)).rejects.toThrow(
      "MySQL connection failed: Connection error"
    );
  });
});
