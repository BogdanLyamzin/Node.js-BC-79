import mongoose from "mongoose";

import Contact from "./models/Contact.js";

const {DB_HOST} = process.env;

const connectDatabase = async ()=> {
  try {
    await mongoose.connect(DB_HOST);
    console.log("Successfully connected database");
    Contact.syncIndexes();
    console.log("Index sync successfully");
  }
  catch(error) {
    console.log("Failed connect database", error);
    throw error;
  }
};

export default connectDatabase;