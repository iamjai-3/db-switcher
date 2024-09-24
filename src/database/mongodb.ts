import mongoose, { ConnectOptions } from "mongoose";

let mongoConnections: { [key: string]: mongoose.Connection } = {};

export async function getMongoDBConnection(dbConfig: {
  uri: string;
  options: any;
}) {
  try {
    if (!mongoConnections[dbConfig.uri]) {
      await mongoose.connect(dbConfig.uri, dbConfig.options);
      mongoConnections[dbConfig.uri] = mongoose.connection;
    }
    return mongoConnections[dbConfig.uri];
  } catch (error: any) {
    throw new Error(`MongoDB connection failed: ${error.message}`);
  }
}
