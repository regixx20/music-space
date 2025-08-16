import express from "express";
import morgan from "morgan";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "node:path";
import fs from "node:fs";

const app = express();
app.use(morgan("dev"));
app.use(cors());

const BACKEND_ACTIVE = process.env.BACKEND_ACTIVE || "python";
const FRONTEND_ACTIVE = process.env.FRONTEND_ACTIVE || "react";
const PY_BACKEND_URL = process.env.PY_BACKEND_URL || "http://localhost:8000";
const JAVA_BACKEND_URL = process.env.JAVA_BACKEND_URL || "http://localhost:8081";

const targetMap = {
  python: PY_BACKEND_URL,
  java: JAVA_BACKEND_URL
};

const target = targetMap[BACKEND_ACTIVE];
if (!target) {
  console.error("BACKEND_ACTIVE invalide, valeurs possibles: python, java");
  process.exit(1);
}

app.get("/__flags", (req, res) => {
  res.json({ BACKEND_ACTIVE, FRONTEND_ACTIVE, target });
});

// Proxy API
app.use("/api", createProxyMiddleware({
  target,
  changeOrigin: true,
  pathRewrite: { "^/api": "" },
  logLevel: "warn"
}));

// Static serving for frontends
const publicRoot = path.join(process.cwd(), "public");
const activeDir = path.join(publicRoot, FRONTEND_ACTIVE);
if (!fs.existsSync(activeDir)) {
  console.warn(`Frontend ${FRONTEND_ACTIVE} introuvable. Assure-toi que /app/public/${FRONTEND_ACTIVE} existe.`);
}

app.use(express.static(activeDir));

// Fallback SPA
app.get("*", (_, res) => {
  const indexPath = path.join(activeDir, "index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send("Frontend non disponible.");
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Gateway sur http://localhost:${PORT} | API proxy -> ${target} | FRONT=${FRONTEND_ACTIVE}`);
});
