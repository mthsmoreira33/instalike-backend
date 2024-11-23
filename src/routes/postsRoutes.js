import express from "express";
import multer from "multer";

import { listPosts, createPost, uploadImage, updatePost} from "../controllers/postsControllers.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ dest: "./uploads", storage });
const cors = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
};


const routes = app => {
    app.use(express.json());
    app.get("/posts", listPosts);
    app.post("/posts", createPost);
    app.post("/uploads", upload.single("imagem"), uploadImage);
    app.put("/uploads/:id", updatePost);
}

export default routes;
