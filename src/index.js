import express, { request, response } from 'express';
const app = express();
app.use(express.json());
const bcrypt = require('bcrypt')
const saltRounds = 1





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
            
            return response.status(201).json();
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
                return response.status(202).json("login com sucesso")
            }else{
                return response.status(404).json("Email ou senha não existe.")
            }
        })
    }
    
})



//lista usuarios
app.get("/usuarios", (request, response)=>{
    return response.status(200).json(usuarios)
})


//criar recados
let recados = []
app.post("/recados", (request, response)=>{
    let recado = request.body
    let idReq = usuarios.findIndex(user => user.id === recado.idUsuario)

    if(idReq === -1){
        return response.status(404).json("ID não encontrado. Digite um ID existente.")
    }
    

    recados.push({
        idUsuario: recado.idUsuario,
        idRecado: Math.floor(Math.random()*67676), 
        titulo: recado.titulo,
        recado: recado.recado         
    })

    return response.status(201).json("Recado criado com sucesso.")



})


//lista recados por id
app.get("/usuarios/recados/:id", (request, response)=>{
    let id = Number(request.params.id)
    let recado = recados.filter(user => user.idUsuario===id)
    return response.status(200).json(recado)
    
})


//update recado por id do recado
app.put("/recados/:idRecado",  (request, response)=>{
    let recado = recados.find(r => r.idRecado == (request.params.idRecado))
    if(recado){
        recado.titulo = request.body.titulo
        recado.recado = request.body.recado
        return response.status(202).json("Recado alterado com sucesso.")
    }else{
        return response.status(404).json("Recado não encontrado")
    }
})


//delete recado por id
app.delete("/recados/delete/:idRecado", (request, response)=>{
    let recado = recados.find(r => r.idRecado == (request.params.idRecado))
    if(recado){
        let index = recados.indexOf(recado)
        recados.splice(index, 1)
        return response.status(202).json("Recado removido com sucesso.")
    }else{
        return response.status(404).json("Recado não encontrado.")
    }
})





app.listen(8080, () => console.log("Servidor iniciado"));