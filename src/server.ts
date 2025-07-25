import dotenv from "dotenv";
import { config } from "./config/config";
import app from './app';
import { db } from "./config/firestore";

dotenv.config();

const PORT = config.port || 5000;

const startServer = async () => {
  try {
    // Test Firestore connection
    const test = await db.collection("healthcheck").limit(1).get();
    console.log("✅ Firestore connected:", test.size >= 0 ? "OK" : "No docs");

    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
