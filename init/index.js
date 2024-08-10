//logic of initialising data in DB
const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");
main().then(() => {
    console.log("connection successful to DB")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async() => {
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({...obj,owner:"66a35a15e2d10c8f8da4b83e"}))
    await Listing.insertMany(initdata.data);
    console.log("Database initialized with data");
}

initDB();