import type {Collection,  Document,  Filter,  UpdateFilter,  IndexSpecification} from "mongodb";
import { CreateIndexesOptions } from "mongodb";

import { serialize } from "../utils/serializer";


export class CollectionManager {

  private collection: Collection;


  constructor(collection: Collection) {
    this.collection = collection;
  }


  getName() {
    return this.collection.collectionName;
  }


  async find(
    filter = {},
    options?: {
      limit?: number;
      skip?: number;
      sort?: Record<string, 1 | -1>;
    }
  ) {
    let cursor = this.collection.find(filter);

    if (options?.sort) {
      cursor = cursor.sort(options.sort);
    }

    if (options?.skip) {
      cursor = cursor.skip(options.skip);
    }

    if (options?.limit) {
      cursor = cursor.limit(options.limit);
    }

    return await cursor.toArray();
  }


  async findOne(
    filter: Filter<Document>
  ) {
    const data = await this.collection
      .findOne(filter);

    return serialize(data);
  }


  async dropIndex(
    name: string
  ) {
    return await this.collection
      .dropIndex(name);
  }


  async count(
    filter: Filter<Document> = {}
  ) {
    return await this.collection
      .countDocuments(filter);
  }


  async aggregate(
    pipeline: Document[]
  ) {

    const data = await this.collection
      .aggregate(pipeline)
      .toArray();

    return serialize(data);
  }


  async listIndexes() {

    return await this.collection
      .indexes();

  }


  async createIndex(
  key: IndexSpecification,
  options?: CreateIndexesOptions
) {
  return await this.collection.createIndex(
    key,
    options
  );
}


  async findPaginated(
    filter: Filter<Document> = {},
    page: number = 1,
    limit: number = 10
  ) {

    const skip = (page - 1) * limit;


    const data = await this.collection
      .find(filter)
      .skip(skip)
      .limit(limit)
      .toArray();


    const total = await this.collection
      .countDocuments(filter);


    return {
      data: serialize(data),
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasMore: page * limit < total
    };

  }


  async insert(
    document: Document
  ) {
    return await this.collection
      .insertOne(document);
  }


  async insertMany(
    documents: Document[]
  ) {
    return await this.collection
      .insertMany(documents);
  }


  async update(
    filter: Filter<Document>,
    update: UpdateFilter<Document>
  ) {
    return await this.collection
      .updateMany(
        filter,
        update
      );
  }


  async delete(
    filter: Filter<Document>
  ) {
    return await this.collection
      .deleteMany(filter);
  }


  getNativeCollection() {
    return this.collection;
  }

}