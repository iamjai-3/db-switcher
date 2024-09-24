import mysql, { Pool, PoolOptions } from "mysql2/promise";

let mysqlPools: { [key: string]: Pool } = {};

export async function getMySQLConnection(dbConfig: PoolOptions): Promise<Pool> {
  try {
    if (!mysqlPools[dbConfig.database!]) {
      mysqlPools[dbConfig.database!] = mysql.createPool(dbConfig);
    }
    return mysqlPools[dbConfig.database!];
  } catch (error: any) {
    throw new Error(`MySQL connection failed: ${error.message}`);
  }
}
