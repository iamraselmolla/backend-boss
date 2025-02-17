import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import http from "http";
import httpStatus from "http-status";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import router from "./src/app/routes/index.js";
import globalErrorHandler from "./src/app/error-handler/GlobalErrorHandler.js";
import connectDatabase from "./src/app/utlis/connectDB.js";
import configs from "./src/app/utlis/generalConfig.js";

const app = express();
const httpServer = http.createServer(app);

// Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:5173",
  //   "https://bangla-pay-kappa.vercel.app",
  //   "https://www.banglapays.com",
];

// 🛡️ Security Middleware
app.use(helmet()); // Secure HTTP headers
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(xss()); // Prevent XSS attacks
app.use(hpp()); // Prevent HTTP parameter pollution

// 🌍 CORS Configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// 📊 Rate Limiting (Prevent DDoS & Brute Force)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per IP
  message: "Too many requests, please try again later.",
});
app.use(limiter);

// 🔄 Middleware for Parsing Requests
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cookieParser()); // Parse cookies

// 🏠 Root Route
app.get("/", (req, res) => {
  res.send("Hello Bangla Pay Personnel! Server is running...");
});

// 🛠️ API Routes
app.use("/api/v1", router);

// 🚨 Error Handling Middleware
app.use(globalErrorHandler);

// ❌ 404 Not Found Handler
app.use((req, res) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not found",
    errorMessages: [{ path: req.originalUrl, message: "API Not Found" }],
  });
});

// 🛑 Graceful Shutdown Handler
function handleGracefulShutdown(reason) {
  console.log(`Shutting down due to ${reason}`);
  httpServer.close(() => process.exit(1));
}

// 🔔 Process-Level Event Listeners
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  handleGracefulShutdown("Uncaught Exception");
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  handleGracefulShutdown("Unhandled Rejection");
});

process.on("SIGTERM", () => handleGracefulShutdown("SIGTERM"));

// 🚀 Server Bootstrap Function
async function bootstrap() {
  try {
    await connectDatabase(); // Connect to MongoDB
    httpServer.listen(configs.port, () => {
      console.log(`🚀 Server is running on port ${configs.port}`);
    });
  } catch (error) {
    console.error("Failed to initialize application:", error);
    process.exit(1);
  }
}

bootstrap();
