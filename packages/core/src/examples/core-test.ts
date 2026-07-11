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


    const user = await users.findOne({
    name: "Yogesh"
    });


    console.log("ONE USER");
    console.log(user);



    const count = await users.count();

    console.log("COUNT");
    console.log(count);



    const result = await users.findPaginated(
    {},
    1,
    2
    );


    console.log("PAGINATION");
    console.log(result);


    await mongo.disconnect();

}


main();