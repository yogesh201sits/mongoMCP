export function inferSchema(documents: Record<string, any>[]) {
  const schema: Record<string, string> = {};

  for (const document of documents) {
    for (const [key, value] of Object.entries(document)) {
      if (schema[key]) continue;

      if (value === null) {
        schema[key] = "null";
      } else if (Array.isArray(value)) {
        schema[key] = "array";
      } else if (value instanceof Date) {
        schema[key] = "Date";
      } else if (
        value &&
        typeof value === "object" &&
        value.constructor?.name === "ObjectId"
      ) {
        schema[key] = "ObjectId";
      } else {
        schema[key] = typeof value;
      }
    }
  }

  return schema;
}