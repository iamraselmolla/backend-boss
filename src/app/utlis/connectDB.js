import mongoose from "mongoose";
import configs from "./generalConfig.js";

const connectDatabase = async () => {
  try {
    await mongoose.connect(configs.databaseUrl);

    console.log("✅ Connected to the database.");
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
    throw error;
  }
};
export default connectDatabase;
