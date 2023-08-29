const mongoose = require("mongoose");
const connectDB = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://andz:TdpwffJYsRCMZstL@cluster0.zvvoebm.mongodb.net/management_DB?retryWrites=true&w=majority"
  );
  console.log(
    `mongoDB connected : ${conn.connection.host}`.cyan.underline.bold
  );
};

module.exports = connectDB;
