# 📦 Document Management Backend

A **TypeScript/Node.js backend** deployed on **Google Cloud Run** that provides REST APIs for file upload, retrieval, and processing orchestration.  
The service integrates with **Google Cloud Storage (GCS)**, **Firestore**, and **Google Pub/Sub** to handle document storage, metadata management, and AI processing triggers.

---

## ✨ Features

- **Automatic Scaling** — Cloud Run horizontally scales based on incoming traffic
- **Three Primary REST API Endpoints**:
  1. `POST /documents/upload` — Upload a file
  2. `GET /documents` — Retrieve paginated document metadata
  3. `GET /documents/:id` — Retrieve metadata for a specific document
- **File Storage** — Uploaded files are stored in **GCS**
- **Metadata Storage** — Metadata is stored in **Firestore**
- **AI Processing Trigger** — Publishes a message to **Google Pub/Sub** (`document-uploaded` topic) to start AI processing
- **Pub/Sub Messaging System**:
  - Decouples backend from AI processing service
  - Dead-letter queue (`dead-letter-queue`) for failed messages

---

## 🛠 Tech Stack

**Runtime**:
- Node.js 20
- TypeScript

**Libraries**:
- express — API framework
- multer — File uploads
- firebase-admin — Firestore integration
- @google-cloud/storage — File storage
- @google-cloud/pubsub — Messaging
- uuid — Unique file IDs
- axios — HTTP requests
- dotenv — Environment variables

**Dev Tools**:
- ts-node-dev — Development with hot reload
- TypeScript — Static typing
- @types/* — Type definitions

---

## 📦 Installation & Local Development

### 1️⃣ Clone the repository
git clone https://github.com/yourusername/document-backend.git
cd document-backend


git clone https://github.com/yourusername/document-backend.git
cd document-backend
