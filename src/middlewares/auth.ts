import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";
import { ApiError } from "../utils/ApiError";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(401, "Missing or invalid Authorization header"));
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Attach user to request
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return next(new ApiError(401, "Unauthorized"));
  }
};