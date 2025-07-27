import admin, { ServiceAccount } from "firebase-admin";
import serviceAccountJson from "../../serviceAccountKey.json";
import { config } from "./config";

const serviceAccount = serviceAccountJson as ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: config.storage.bucketName
});

const db = admin.firestore();
export { db };