import express, { Request, Response } from "express";
import dotenv from "dotenv";
import {
  deleteUser,
  getUser,
  getUsers,
  postUser,
} from "./users/service/user-from-json";

if (process.env.NODE_ENV === "development") {
  dotenv.config();
}

const app = express();
const port = process.env.PORT;

app.use(express.json());
// app.use(express.urlencoded());

app.get("/users", getUsers);
app.post("/users", postUser);
app.get("/users/:id", getUser);
app.delete("/users/:id", deleteUser);

app.listen(port, () => {
  console.log("Server is running on port", port);
});
