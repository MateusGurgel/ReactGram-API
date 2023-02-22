const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const connect = async () => {
  try {
    const dbConn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.hcskn8t.mongodb.net/?retryWrites=true&w=majority`
    );

    console.log("Successfuly conected with database")

    return dbConn
  } catch (error) {
    console.log(error)
  }
};

connect();

module.exports = connect;
