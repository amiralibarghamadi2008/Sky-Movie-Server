import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import rateLimit from "express-rate-limit";
import pino from "pino";

// Import Routers
import UserRouter from "./routes/UserRoutes/routes.js";
import SMSRouter from "./routes/SMS_Route/route.js";
import ProductRouter from "./routes/ProductRoutes/routes.js";
import TicketRouter from "./routes/TicketRoutes/TicketRoutes.js";

// Database Connection Middleware
import ConnectToDataBace_Middlewares from "./middlewares/GlobalMiddlewares/ConnectToDataBace.js";

// Setup Logger
const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport:
    process.env.NODE_ENV !== "production"
      ? { target: "pino-pretty", options: { colorize: true } }
      : undefined,
});

const app = express();

// Set Directory Path for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Trust Reverse Proxy (Nginx)
app.set("trust proxy", 1);

// ===========================
// Security & Rate Limiting
// ===========================

// Global Rate Limiter to prevent Abuse
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقیقه
  max: 300, // حداکثر ۳۰۰ ریکوئست برای هر IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "درخواست‌های بیش از حد مجاز! لطفاً چند دقیقه دیگر دوباره تلاش کنید.",
  },
});

app.use(globalLimiter);

// Security Headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

// Prevent HTTP Parameter Pollution
app.use(hpp());

// ===========================
// Parsers & HTTP Logging
// ===========================

app.use(cookieParser());
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Serve Static Uploads Folder
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// ===========================
// CORS Configuration
// ===========================

const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:3000"].filter(
  Boolean,
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS Policy Violation: Origin not allowed."));
      }
    },
    credentials: true,
  }),
);

// ===========================
// Database Middleware
// ===========================

app.use(ConnectToDataBace_Middlewares);

// ===========================
// Health Check Endpoint
// ===========================

app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    status: "UP",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "🚀 Mavara System Production API is running smoothly",
  });
});

// ===========================
// API Routes
// ===========================

app.use("/api", UserRouter);
app.use("/api", SMSRouter);
app.use("/api/admin/products", ProductRouter);
app.use("/api/tickets", TicketRouter);

// ===========================
// 404 Handler
// ===========================

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "مسیر مورد نظر یافت نشد ❌",
    path: req.originalUrl,
  });
});

// ===========================
// Global Error Handler
// ===========================

app.use((err, req, res, next) => {
  logger.error(err, "🔴 Global Unhandled Error:");
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "خطای داخلی سرور رخ داده است.",
  });
});

// ===========================
// Start Server
// ===========================

const PORT = process.env.PORT || process.env.LOCALE_PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(
    `🚀 Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`,
  );
});

// ===========================
// Process Error Handling
// ===========================

process.on("uncaughtException", (error) => {
  logger.fatal(error, "🔴 Uncaught Exception Error");
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  logger.fatal(reason, "🔴 Unhandled Rejection Error");
  process.exit(1);
});

// ===========================
// Graceful Shutdown
// ===========================

const shutdown = (signal) => {
  logger.info(
    `🛑 Signal ${signal} received. Closing HTTP server gracefully...`,
  );
  server.close(() => {
    logger.info("✅ HTTP server closed. Exiting process.");
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
