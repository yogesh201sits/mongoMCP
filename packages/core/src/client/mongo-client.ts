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

    await this.client.connect();
    this.connected = true;
  }

  async disconnect() {
    if (!this.connected) {
      return;
    }

    await this.client.close();
    this.connected = false;
  }

  getClient() {
    return this.client;
  }

  isConnected() {
    return this.connected;
  }
}