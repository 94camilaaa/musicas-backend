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

//Musicas (id, nome, cantor, ano, gosta(sim ou não))

// GET
server.get('/musica', async function(request, response) {
   result = await pool.query('SELECT * FROM musicas');

   return response.json(result.rows);
})

server.get('/musica/search', async function(request, response) {
    const nome = request.query.nome;
    const sql = `SELECT * FROM musicas WHERE nome ILIKE $1`;
    const result = await pool.query(sql, ["%" +  nome + "%"]);
    return response.json(result.rows);
})

server.get('/musica/:id', async function(request, response) {
    const id = request.params.id;
    const sql = `SELECT * FROM musicas WHERE id = $1`
    const result = await pool.query(sql, [id]);
    return response.json(result.rows);
})
 
//POST
server.post('/musica', async function(request, response) {
    const nome = request.body.nome;
    const cantor = request.body.cantor;
    const ano = request.body.ano;
    const sql= `INSERT INTO musicas (nome, cantor, ano, gosta) VALUES ($1, $2, $3, $4)`;
    await pool.query(sql, [nome, cantor, ano, false]);
    return response.status(204).send();
})

//DELETE
server.delete('/musica/:id', async function(request, response) {
    const id = request.params.id;
    const sql = `DELETE FROM musicas WHERE id = $1`;
    await pool.query(sql, [id]);
    return response.status(204).send();
})


//UPDATE
server.put('/musica/:id', async function(request, response) {
    const id = request.params.id;
    const { nome, cantor, ano, gosta } = request.body;
    const sql = `UPDATE musicas SET nome = $1, cantor = $2, ano = $3, gosta = $4 WHERE id = $5`;
    await pool.query(sql, [nome, cantor, ano, gosta, id]);
    return response.status(204).send();
})


//UPDATE DO gosta
server.patch('/musica/:id/gosta', async function(request, response) {
    const id = request.params.id;
    const sql = `UPDATE musicas SET gosta = true WHERE id = $1`;
    await pool.query(sql, [id]);
    return response.status(204).send();
})

server.patch('/musica/:id/naogosta', async function(request, response) {
    const id = request.params.id;
    const sql = `UPDATE musicas SET gosta = false WHERE id = $1`;
    await pool.query(sql, [id]);
    return response.status(204).send();
})

server.listen(process.env.PORT || 3000);