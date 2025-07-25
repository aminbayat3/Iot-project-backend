import { Router } from "express";
import { asyncHandler } from "../utils/asynHandler";
import multer from "multer";
import {
  uploadDocument,
  getAllDocuments,
  getDocumentById,
} from "../controllers/documentController";

const router = Router({ mergeParams: true });
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), asyncHandler(uploadDocument));
router.get("/", asyncHandler(getAllDocuments));
router.get("/:id", asyncHandler(getDocumentById));

export default router;