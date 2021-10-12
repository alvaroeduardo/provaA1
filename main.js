const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8000;
const app = express();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

//LISTA TODOS O USUARIO COM BASE NO ID link/api?usuario_id=ID
app.get("/api", (req, res)=>{
    fs.readFile("usuarios.json", "utf8", (err, data)=>{
      if (err) {
        const response = {status: "falha", resultado: err};
        res.json(response);

      } else {
        const obj = JSON.parse(data);
        let result = "Nenhum usuário foi encontrado";
    
        obj.usuarios.forEach( usuario => {
          if (usuario != null) {
            if (usuario.usuario_id == req.query.usuario_id) {
              result = usuario;
            }
          }
        });
    
        const response = {status: "sucesso", resultado: result};
        res.json(response);
      }
    });
});

// PARA STARTAR O SERVIDOR É SÓ DAR UM NPM START
app.listen(port, ()=>{
    console.log('Servidor iniciado com sucesso na porta:', port)
})