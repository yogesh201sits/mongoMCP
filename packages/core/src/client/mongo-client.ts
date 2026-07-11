import { MongoClient } from "mongodb";
import type { MongoClientConfig } from "../types/config";

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
      this.connected = false;

      throw new Error(
        `Failed to connect to MongoDB: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async disconnect() {
    if (!this.connected) {
      return;
    }

    try {
      await this.client.close();
      this.connected = false;
    } catch (error) {
      throw new Error(
        `Failed to disconnect from MongoDB: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  getClient() {
    return this.client;
  }

  isConnected() {
    return this.connected;
  }
}