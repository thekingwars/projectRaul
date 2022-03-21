import express from "express";
import cors from "cors";
import morgan from "morgan";
import db from "./db";
import index from "./routes/index.routes";

//vars
const app = express();

//options
app.set("port", 3200 || process.env.PORT);

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
app.use("/api", index);

//server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
