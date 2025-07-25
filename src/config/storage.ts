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
    stream.on("finish", () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${gcsFile.name}`;
      resolve(publicUrl);
    });

    stream.end(file.buffer);
  });
};