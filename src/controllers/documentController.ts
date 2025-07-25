import { Request, Response } from "express";
import { db } from "../config/firestore";
import { uploadFileToGCS } from "../config/storage";
import { v4 as uuidv4 } from "uuid";
import { ApiError } from "../utils/ApiError";
import { publishToTopic } from "config/pubsub";
import { config } from "../config/config"

/**
 * POST /documents/upload
 * Uploads a file to GCS and saves metadata in Firestore
 */
export const uploadDocument = async (req: Request, res: Response) => {
  if (!req.file) {
    throw new ApiError(400, "No file uploaded");
  }

  const fileUrl = await uploadFileToGCS(req.file);
  const fileId = uuidv4();

  const metadata = {
    fileId,
    filename: req.file.originalname,
    fileUrl,
    status: "processing",
    uploadedAt: new Date().toISOString(),
  };

  await db.collection("documents").doc(fileId).set(metadata);

  // Publish to Pub/Sub to trigger AI service
  await publishToTopic(config.pubsub.topicName, {
    fileId,
    fileUrl,
  });

  res.status(201).json({ message: "Document uploaded", fileId });
};

/**
 * GET /documents?page=1&perPage=10
 * Returns paginated list of documents
 */
export const getAllDocuments = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const perPage = parseInt(req.query.perPage as string, 10) || 10;

  const snapshot = await db
    .collection("documents")
    .orderBy("uploadedAt", "desc")
    .get();

  const allDocs = snapshot.docs.map((doc) => doc.data());
  const paginated = allDocs.slice((page - 1) * perPage, page * perPage);

  res.status(200).json({
    documents: paginated,
    total: allDocs.length,
    page,
    perPage,
  });
};

/**
 * GET /documents/:id
 * Returns metadata for a single document
 */
export const getDocumentById = async (req: Request, res: Response) => {
  const docRef = db.collection("documents").doc(req.params.id);
  const docSnap = await docRef.get();

  if (!docSnap.exists) {
    throw new ApiError(404, "Document not found");
  }

  res.status(200).json(docSnap.data());
};