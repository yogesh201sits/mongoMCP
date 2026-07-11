import type {  Collection,  Document, Filter,  UpdateFilter} from "mongodb";

export class CollectionManager {

  private collection: Collection;


  constructor(collection: Collection) {
    this.collection = collection;
  }


  getName() {
    return this.collection.collectionName;
  }


  async find(
    filter: Filter<Document> = {}
  ) {

    return await this.collection
      .find(filter)
      .toArray();

  }


  async findOne(
    filter: Filter<Document>
  ) {

    return await this.collection
      .findOne(filter);

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