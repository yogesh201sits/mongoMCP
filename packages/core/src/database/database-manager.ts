import type { Db } from "mongodb";
import { CollectionManager } from "../collection/collection-manager";

export class DatabaseManager {
  private db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  getName() {
    return this.db.databaseName;
  }

  collection(name: string) {
    return new CollectionManager(
      this.db.collection(name)
    );
  }

  async listCollections() {
    const collections = await this.db
      .listCollections()
      .toArray();

    return collections.map(
      (collection) => collection.name
    );
  }

  getNativeDb() {
    return this.db;
  }
}