import mongoose from "mongoose";
import { getMongoDBConnection } from "../src/database/mongodb";

jest.mock("mongoose", () => {
  const mConnection = {} as mongoose.Connection;
  return {
    connect: jest.fn().mockResolvedValue(mConnection),
    connection: mConnection,
  } as unknown as { connect: jest.Mock; connection: mongoose.Connection };
});

describe("MongoDB Connection", () => {
  const mockConnection = {} as mongoose.Connection;

  beforeEach(() => {
    (mongoose.connect as jest.Mock).mockResolvedValue(mockConnection);
    (mongoose.connection as any) = mockConnection;
  });

  it("should create a new connection if it does not exist", async () => {
    const dbConfig = {
      uri: "mongodb://localhost:27017/test",
      options: { useNewUrlParser: true, useUnifiedTopology: true },
    };

    const connection = await getMongoDBConnection(dbConfig);
    expect(mongoose.connect).toHaveBeenCalledWith(
      dbConfig.uri,
      dbConfig.options
    );
    expect(connection).toBe(mockConnection);
  });

  it("should reuse existing connection if it exists", async () => {
    const dbConfig = {
      uri: "mongodb://localhost:27017/test",
      options: { useNewUrlParser: true, useUnifiedTopology: true },
    };

    await getMongoDBConnection(dbConfig);

    const connection = await getMongoDBConnection(dbConfig);
    expect(mongoose.connect).toHaveBeenCalledTimes(1);
    expect(connection).toBe(mockConnection);
  });

  it("should handle errors during connection", async () => {
    (
      mongoose.connect as jest.MockedFunction<typeof mongoose.connect>
    ).mockRejectedValue(new Error("Connection error"));

    const dbConfig = {
      uri: "",
      options: { useNewUrlParser: true, useUnifiedTopology: true },
    };

    await expect(getMongoDBConnection(dbConfig)).rejects.toThrow(
      "MongoDB connection failed: Connection error"
    );
  });
});
