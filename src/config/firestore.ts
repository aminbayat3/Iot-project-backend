import admin, { ServiceAccount } from "firebase-admin";
import { config } from "./config";
import fs from "fs";

const rawKey = fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS!, "utf-8");
const serviceAccount = JSON.parse(rawKey) as ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: config.storage.bucketName
});

const db = admin.firestore();
export { db };