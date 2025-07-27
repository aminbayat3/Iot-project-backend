import dotenv from "dotenv";
dotenv.config();

const requiredEnv = [
  "PORT",
  "GCS_BUCKET",
  "PUBSUB_TOPIC",
  "FRONTEND_ORIGIN",
  "GOOGLE_APPLICATION_CREDENTIALS",
  "GCP_PROJECT_ID",
  "NODE_ENV",
];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export const config = {
  port: parseInt(process.env.PORT!, 10),
  pubsub:{
    topicName: process.env.PUBSUB_TOPIC!,
    projectId: process.env.GCP_PROJECT_ID!,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS!,
  },
  storage: {
    bucketName: process.env.GCS_BUCKET!,
  },
  FrontendOrigin: process.env.FRONTEND_ORIGIN!,
  nodeEnv: process.env.NODE_ENV!,
};
