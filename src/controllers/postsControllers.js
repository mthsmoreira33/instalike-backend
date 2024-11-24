import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";
import { getPosts, createNewPost, updateNewPost } from "../models/postModels.js";

export async function listPosts(req, res) {
    const posts = await getPosts();

    res.status(200).json(posts);
}

export async function createPost(req, res) {
    const newPost = req.body;

    try {
        const createdPost = await createNewPost(newPost);
        res.status(201).json(createdPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }

}

export async function uploadImage(req, res) {

    const newPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        const createdPost = await createNewPost(newPost);
        const updatedImage = `uploads/${createdPost.insertedId}.png`;
        fs.renameSync(req.file.path, updatedImage);
        res.status(201).json(createdPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ Erro: "Falha na requisição" });
    }
}

export async function updatePost(req, res) {
    const id = req.params.id;
    const imgUrl = `http://localhost:3000/${id}.png`;

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);
        const post = {
            imgUrl,
            descricao,
            alt: req.body.alt,
        };

        const updatedPost = await updateNewPost(id, post);
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ Erro: "Falha na requisição" });
    }
}
