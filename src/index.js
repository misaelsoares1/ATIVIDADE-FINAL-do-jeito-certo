import express, { request } from 'express';
const app = express();
app.use(express.json());
const bcrypt = require('bcrypt')
const saltRounds = 1


//CRUD DAS CONTAS
//CRUD DAS ANOTAÇÕES
//USAR bcrypt
//FAZER COMMIT

//cuidar regras: 
//criar middleware para validar se existe contas com o mesmo email

let usuarios = []

//Adiciona usuario
app.post("/usuarios",(request, response)=>{
    let usuario = request.body
    
    let valida = usuarios.find(user => user.email === usuario.email)
    
    if(valida){
        return response.status(400).json("Usuario já existe.")
    }else{
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
    })
}


})




//Login
app.post("/usuarios/login", (request, response)=>{
    let login = request.body
    let entrarEmail = usuarios.some(user => user.email === login.email)
    

    if(entrarEmail){
        let index = usuarios.findIndex(user => user.email == login.email)
        
        bcrypt.compare(login.senha, usuarios[index].senha, (err, hash)=>{
            if(hash){
                return response.status(200).json("login com sucesso")
            }else{
                return response.status(400).json("Email ou senha não existe.")
            }
        })
    }
    
    
})



//lista usuarios
app.get("/usuarios", (request, response)=>{
    return response.status(200).json(usuarios)
})


//var = variavel global

//Recados




app.listen(8080, () => console.log("Servidor iniciado"));