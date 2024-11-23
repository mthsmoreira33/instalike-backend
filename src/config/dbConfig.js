import { MongoClient } from "mongodb";

export default async function conectarBancoDeDados(stringConexao) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(stringConexao);
        console.log("Conectando cluster ao banco de dados...");
        await mongoClient.connect();

        console.log("Conectado ao MongoDB");

        return mongoClient;
    } catch(erro) {
        console.log("Falha na conexão com o banco de dados! ", erro);
        process.exit();
    }
}
