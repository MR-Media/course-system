const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

exports.connect = () => {
  mongoose
    .connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DB connection succesful!"))
    .catch(() => {
      console.error("DB connection failed!");
      process.exit(1);
    });
};
