import * as mongoose from "mongoose";

mongoose.set("strictQuery", false);

export const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_DB_URL || "")
    .then(() => console.log("DB connection succesful!"))
    .catch(() => {
      console.error("DB connection failed!");
      process.exit(1);
    });
};
