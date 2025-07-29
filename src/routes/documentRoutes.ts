import { Router } from "express";
import { authenticate } from "middlewares/auth";
import { asyncHandler } from "../utils/asynHandler";
import multer from "multer";
import {
  uploadDocument,
  getAllDocuments,
  getDocumentById,
} from "../controllers/documentController";

const router = Router({ mergeParams: true });
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", authenticate, upload.single("file"), asyncHandler(uploadDocument));
router.get("/", authenticate, asyncHandler(getAllDocuments));
router.get("/:id", authenticate, asyncHandler(getDocumentById));

export default router;