import admin, { ServiceAccount } from "firebase-admin";
import { config } from "./config";

import fs from "fs";

// Load credentials from file in dev, from env in production
let serviceAccount: ServiceAccount;

if (config.nodeEnv === "production") {
  // Parse from env variable (Cloud Run secret)
  serviceAccount = JSON.parse(config.pubsub.keyFilename) as ServiceAccount;
} else {
  // Load from local JSON file in development
  const raw = fs.readFileSync(config.pubsub.keyFilename, "utf-8");
  serviceAccount = JSON.parse(raw) as ServiceAccount;
}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: config.storage.bucketName
});

const db = admin.firestore();
export { db };