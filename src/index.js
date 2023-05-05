import express from 'express';
const app = express();
app.use(express.json());
const bcrypt = require('bcrypt')
const saltRounds = 1


//CRUD DAS CONTAS
//CRUD DAS ANOTAÇÕES
//USAR bcrypt
//FAZER COMMIT

let usuarios = []
//Adiciona usuario
app.post("/usuarios", (request, response)=>{
    let usuario = request.body

    bcrypt.hash(usuario.senha, saltRounds, function(err, hash) {
        if(hash){
            usuarios.push({
                id: Math.floor(Math.random()*67676),
                nome: usuario.nome,
                sobrenome: usuario.sobrenome,
                idade: usuario.idade,
                email: usuario.email,
                senha: hash
            }); 
            return response.status(204).json();
        } else {
            return response.status(400).json("Ocorreu um erro:" + err)
        }
    });
})




//Login




//lista usuarios
app.get("/usuarios", (request, response)=>{
    return response.status(200).json(usuarios)
})




//Update




app.listen(8080, () => console.log("Servidor iniciado"));