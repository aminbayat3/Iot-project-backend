import { PubSub } from "@google-cloud/pubsub";
import dotenv from "dotenv";
dotenv.config();

const pubsub = new PubSub();

export const publishToTopic = async (
  topicName: string,
  message: Record<string, any>
): Promise<void> => {
  const topic = pubsub.topic(topicName);

  try {
    const messageId = await topic.publishMessage({
      json: message,
    });
    console.log(`📨 Published message ${messageId} to ${topicName}`);
  } catch (err) {
    console.error("❌ Failed to publish message:", err);
    throw err;
  }
};