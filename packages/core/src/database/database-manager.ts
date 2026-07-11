import type { Db } from "mongodb";

export class DatabaseManager {
  private db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  getName() {
    return this.db.databaseName;
  }

  async listCollections() {
    const collections = await this.db
      .listCollections()
      .toArray();

    return collections.map(
      (collection) => collection.name
    );
  }

  async createCollection(name: string) {
    return await this.db.createCollection(name);
  }

  async dropCollection(name: string) {
    return await this.db
      .collection(name)
      .drop();
  }

  getNativeDb() {
    return this.db;
  }
}