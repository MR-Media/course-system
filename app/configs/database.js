const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

exports.connect = () => {
  mongoose
    .connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DB connection succesful!"))
    .catch((error) => {
      console.error("DB connection failed!", error);
      process.exit(1);
    });
};
