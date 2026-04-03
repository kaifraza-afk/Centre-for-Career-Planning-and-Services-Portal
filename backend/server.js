import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import apiRouter from "./routes/index.router.js";
import connectionRouter from "./routes/connect.routes.js";
import messageRouter from "./routes/message.routes.js"

import mlRoutes from "./routes/ml.js"
dotenv.config();

const port = process.env.PORT || 3000;
  
const app = express();


  app.use(
    cors({
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      credentials: true,
    })
  );

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use all API routes
app.use("/api", apiRouter);

app.use('/api/ml', mlRoutes);

app.use("/api/connect", connectionRouter);
app.use("/api/messages", messageRouter);


// Expose Prometheus metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});


// Start the server
app.listen(port, () => {
  connectDB();
  console.log(`Server is running at port ${port}`);
});

