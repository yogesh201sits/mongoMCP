import { MongoClient } from "mongodb";
import type { MongoClientConfig } from "../types/config";
import { DatabaseManager } from "../database/database-manager";
import { MongoKitError } from "../errors/MongoKitError";

export class MongoKit {
  private client: MongoClient;
  private connected = false;

  constructor(config: MongoClientConfig) {
    this.client = new MongoClient(config.uri);
  }

  async connect() {
    if (this.connected) {
      return;
    }

    try {
      await this.client.connect();
      this.connected = true;
    } catch (error) {
      throw new MongoKitError("MongoDB connection failed");
    }
  }

  async disconnect() {
    try {
      await this.client.close();
      this.connected = false;
    } catch (error) {
      throw new MongoKitError("MongoDB disconnect failed");
    }
  }

  database(name: string) {
    try {
      return new DatabaseManager(
        this.client.db(name)
      );
    } catch (error) {
      throw new MongoKitError(
        `Failed to access database ${name}`
      );
    }
  }

  getClient() {
    return this.client;
  }
  
}