const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const port = process.env.PORT || 8000;
const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());


// LIVROS
const livros = ['Harry Potter e a Pedra Filosofal', 'Harry Potter e a Câmara Secreta'];

// REQUISIÇÕES
// RETORNA TODOS OS LIVROS
app.get('/', (req, res)=>{
    return res.json(livros);
});

// RETORNA APENAS 1 LIVRO
app.get('/:index', (req, res)=>{
    const {index} = req.params;

    return res.json(livros[index]);
})

//ADICIONA UM NOVO LIVRO
app.post('/', (req, res)=>{
    const {name} = req.body;

    livros.push(name);

    return res.json(livros);
})

// ATUALIZA UM LIVRO
app.put('/livros/:index', (req, res)=>{
    const {index} = req.params;
    const {name} = req.body;

    livros[index] = name;

    return res.json(livros);
})

// DELETA UM LIVRO
app.delete('/livros/:index', (req, res)=>{
    const {index} = req.params;
    
    livros.splice(index, 1);
    return res.json({message: "O livro foi deletado"});
});


app.listen(port, ()=>{
    console.log('Servidor iniciado com sucesso.')
})