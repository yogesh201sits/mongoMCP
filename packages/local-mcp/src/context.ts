import { MongoKit } from "@mongodb-kit/core";

export async function createMongo(uri: string) {
  const mongo = new MongoKit({
    uri,
  });

  await mongo.connect();

  return mongo;
}