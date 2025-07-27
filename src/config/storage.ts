import { Storage } from "@google-cloud/storage";
import { config } from './config';

const storage = new Storage({
  keyFilename: "serviceAccountKey.json", 
});

const bucket = storage.bucket(config.storage.bucketName);

export const uploadFileToGCS = async (file: Express.Multer.File): Promise<string> => {
  const gcsFile = bucket.file(Date.now() + "-" + file.originalname);

  return new Promise((resolve, reject) => {
    const stream = gcsFile.createWriteStream({
      resumable: false,
      metadata: {
        contentType: file.mimetype,
      },
    });

    stream.on("error", (err) => reject(err));

    stream.on("finish", async () => {
      try {
        // Generate signed URL (valid for 15 minutes)
        const [url] = await gcsFile.getSignedUrl({
          action: "read",
          expires: Date.now() + 15 * 60 * 1000, // 15 minutes
        });

        resolve(url);
      } catch (err) {
        reject(`Failed to generate signed URL: ${err}`);
      }
    });

    stream.end(file.buffer);
  });
};