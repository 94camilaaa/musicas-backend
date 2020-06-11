const express = require('express');
const Pool = require('pg').Pool;
const cors = require('cors');

const pool = new Pool ({
    user: 'rqhyabtwuyeaam',
    password: 'c1cddcca28cfa9721d3762ae640bc0da9604cc23aee5ac3c9fe1d50b3bed8689',
    host: 'ec2-52-201-55-4.compute-1.amazonaws.com',
    database:'d7ri4qruv1b1f0',
    port: 5432,
    ssl: {rejectUnauthorized: false }
})

const server = express();

server.use(cors());

server.use(express.json());

//Musicas (id, nome, cantor, ano, gosta(sim ou não)
 
server.get('/musicas', async function(request, response) {
   result = await pool.query('SELECT * FROM musicas');

   return response.json(result.rows);
})

server.get('/musicas/search', async function(request, response) {
    const nome = request.query.nome;
    const sql = `SELECT * FROM musicas WHERE nome ILIKE $1`;
    const result = await pool.query(sql, ["%" +  nome + "%"]);
    return response.json(result.rows);
})

server.get('/musicas/:id', async function(request, response) {
    const id = request.params.id;
    const sql = `SELECT * FROM musicas WHERE id = $1`
    const result = await pool.query(sql, [id]);
    return response.json(result.rows);
})
 
server.post('/musicas', function(request, response) {
   
    const {nome, cantor, ano, gosta} = request.body;

    musicas.push({nome, cantor, ano, gosta})
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