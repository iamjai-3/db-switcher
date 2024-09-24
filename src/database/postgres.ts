import { Pool, PoolConfig } from "pg";

let pgPools: { [key: string]: Pool } = {};

export async function getPostgresConnection(
  dbConfig: PoolConfig
): Promise<Pool> {
  try {
    if (!pgPools[dbConfig.database!]) {
      pgPools[dbConfig.database!] = new Pool(dbConfig);
    }
    return pgPools[dbConfig.database!];
  } catch (error: any) {
    throw new Error(`PostgreSQL connection failed: ${error.message}`);
  }
}
