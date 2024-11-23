import "dotenv/config";
import { ObjectId } from "mongodb";
import conectarBancoDeDados from "../config/dbConfig.js";

const conexao = await conectarBancoDeDados(process.env.STRING_CONEXAO);

export async function getPosts() {
  const db = conexao.db("imersao-instabytes");
  const collection = db.collection("posts");
  const posts = await collection.find().toArray();

  return posts;
}

export async function createNewPost(newPost) {
  const db = conexao.db("imersao-instabytes");
  const collection = db.collection("posts");

  return collection.insertOne(newPost);
}

export async function updateNewPost(id, post) {
  const db = conexao.db("imersao-instabytes");
  const collection = db.collection("posts");
  const objId = ObjectId.createFromHexString(id);

  return collection.updateOne({ _id: new ObjectId(objId) }, {$set: post});
}
