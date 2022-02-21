import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import cors from 'cors'
import storeRouter from "./routers/store.js";
import authRouter from "./routers/auth.js";

if (process.env.NODE_ENV !== "production") dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api/store", storeRouter);
app.use("/api/auth", authRouter);

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});
