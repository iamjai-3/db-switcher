import { getPostgresConnection } from "./postgres";
import { getMySQLConnection } from "./mysql";
import { getMongoDBConnection } from "./mongodb";
import { DbConfig } from "../types/dbConfig";

export async function dbSwitcher(dbConfig: DbConfig) {
  try {
    switch (dbConfig.type) {
      case "postgres":
        return await getPostgresConnection(dbConfig.config);
      case "mysql":
        return await getMySQLConnection(dbConfig.config);
      case "mongodb":
        return await getMongoDBConnection(dbConfig.config);
      default:
        throw new Error("Unsupported database type");
    }
  } catch (error: any) {
    throw new Error(`Failed to connect to ${dbConfig.type}: ${error.message}`);
  }
}
