const express = require('express');

const server = express();

server.use(express.json());

//Musicas (id, nome, cantor, ano, gosta(sim ou não)

const musicas = [
    {id: 1, nome: 'Shape of You', cantor: 'Ed Sheeran', ano: 2017, gosta: 'Sim'},
    {id: 2, nome: 'Just The Way You Are', cantor: 'Bruno Mars', ano: 2010, gosta: 'Sim'} 
]

server.get('/musicas', function(request, response) {
    response.json(musicas);
})
 
server.post('/musicas', function(request, response) {
   
    const {id, nome, cantor, ano, gosta} = request.body;

    musicas.push({id, nome, cantor, ano, gosta})
    response.status(204).send();
})

server.put('/musicas/:id', function(request, response) {
    const id = request.params.id;
    const {nome, cantor, ano, gosta} = request.body;

   for(let i = 0; i < musicas.length; i++){
        if(musicas[i].id == id) {
            musicas[i].nome = nome;
            musicas[i].cantor = cantor;
            musicas[i].ano = ano;
            musicas[i].gosta = gosta;
            break;
        }
    }

    return response.status(204).send();

})

server.delete('/musicas/:id', function(request, response) {

    const id = request.params.id;

    for(let i = 0; i < musicas.length; i++){
        if(musicas[i].id == id) {
            musicas.splice(i, 1)
            break;
        }
    }

    return response.status(204).send();
})

server.listen(process.env.PORT || 3000);