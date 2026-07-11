import { MongoClient } from "mongodb";
import type { MongoClientConfig } from "../types/config";
import { DatabaseManager } from "../database/database-manager";
import { MongoKitError } from "../errors/MongoKitError";

export class MongoKit {
  private client: MongoClient;
  private connected = false;

  constructor(config: MongoClientConfig) {
    try {
      this.client = new MongoClient(config.uri);
    } catch (error) {
      throw new MongoKitError("Failed to create MongoDB client", {
        cause: error,
      });
    }
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

      throw new MongoKitError("Failed to connect to MongoDB", {
        cause: error,
      });
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
      throw new MongoKitError("Failed to disconnect from MongoDB", {
        cause: error,
      });
    }
  }

  database(name: string) {
    try {
      if (!this.connected) {
        throw new MongoKitError(
          "MongoDB is not connected. Call connect() before accessing database."
        );
      }

      return new DatabaseManager(this.client.db(name));
    } catch (error) {
      if (error instanceof MongoKitError) {
        throw error;
      }

      throw new MongoKitError(`Failed to access database: ${name}`, {
        cause: error,
      });
    }
  }

  getClient() {
    if (!this.connected) {
      throw new MongoKitError(
        "MongoDB client is not connected"
      );
    }

    return this.client;
  }
}