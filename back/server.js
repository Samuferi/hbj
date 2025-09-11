import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import loginRoutes from "./login_t.js";  // ide húzzuk be a login route-okat
import problemRoutes from "./ujprob_b.js";

const app = express();
app.use(bodyParser.json());

// __dirname beállítása
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// statikus frontend kiszolgálás
app.use(express.static(path.join(__dirname, "front")));

// feltöltött fájlok elérhetővé tétele
app.use("/uploads", express.static("uploads"));

// login route-ok
app.use("/api/login", loginRoutes);

// probléma bejelentő route-ok
app.use("/api/problem", problemRoutes);

// szerver indítása
app.listen(3000, () => {
  console.log("✅ Server fut: http://localhost:3000/login");
});
