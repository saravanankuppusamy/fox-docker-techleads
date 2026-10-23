import express from "express";
import { MongoClient } from "mongodb";

const app = express();
app.use(express.json());
const port = Number(process.env.PORT || 3000);
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri, { serverSelectionTimeoutMS: 3000 });
let db;

app.get("/api/health", async (_req, res) => {
  try {
    if (!db) throw new Error("Database not ready");
    await db.command({ ping: 1 });
    res.json({ status: "ok", service: "fox-api", database: "connected" });
  } catch {
    res.status(503).json({ status: "unhealthy", database: "disconnected" });
  }
});

for (const collection of ["customers", "policies", "claims"]) {
  app.get(`/api/${collection}`, async (_req, res) => {
    try {
      const records = await db
        .collection(collection)
        .find({}, { projection: { _id: 0 } })
        .toArray();
      res.json(records);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Unable to load data" });
    }
  });
}

app.get("/api/summary", async (_req, res) => {
  try {
    const [customers, policies, claims] = await Promise.all(
      ["customers", "policies", "claims"].map((name) =>
        db.collection(name).countDocuments(),
      ),
    );
    res.json({ customers, policies, claims });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to load summary" });
  }
});

async function start() {
  for (let attempt = 1; attempt <= 30; attempt++) {
    try {
      await client.connect();
      db = client.db("foxinsurance");
      await db.command({ ping: 1 });
      break;
    } catch (err) {
      if (attempt === 30) throw err;
      console.log(`MongoDB not ready (${attempt}/30), retrying...`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
  app.listen(port, "0.0.0.0", () =>
    console.log(`Fox API listening on ${port}`),
  );
}

process.on("SIGTERM", async () => {
  await client.close();
  process.exit(0);
});
start().catch((err) => {
  console.error("Startup failed", err);
  process.exit(1);
});
