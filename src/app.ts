import express from "express";
import cors from "cors";
import { config } from "./config/config";
import { errorHandler } from "./middlewares/errorHandler";
import documentRoutes from "./routes/documentRoutes";

const app = express();

//to allow or restrict cross-origin requests from browsers. Without it, browsers block frontend apps on different domains (or ports) from accessing your backend due to security policies.
app.use(
  cors({
    origin: config.FrontendOrigin,
  })
);
app.use(express.json());

app.use("/api/documents", documentRoutes);

app.use(errorHandler);

export default app;

