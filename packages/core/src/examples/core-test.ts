import { MongoKit } from "../client/mongo-client";


const mongo = new MongoKit({
  uri: "mongodb://localhost:27017"
});


async function main() {

  await mongo.connect();

  console.log("Connected");


  const users = mongo
    .database("test")
    .collection("users");


  await users.insert({
    name: "Yogesh",
    age: 21
  });


  const data = await users.find({});


  console.log(data);


  await mongo.disconnect();

}


main();