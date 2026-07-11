import {ObjectId,  BSON} from "mongodb";

export function serialize(
  data: unknown
): unknown {

  if (data === null || data === undefined) {
    return data;
  }


  if (data instanceof ObjectId) {
    return data.toString();
  }


  if (data instanceof Date) {
    return data.toISOString();
  }


  if (Array.isArray(data)) {
    return data.map(
      item => serialize(item)
    );
  }


  if (typeof data === "object") {

    const result: Record<string, unknown> = {};


    for (const key in data as Record<string, unknown>) {

      result[key] = serialize(
        (data as Record<string, unknown>)[key]
      );

    }


    return result;
  }


  return data;
}