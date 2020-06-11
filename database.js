// yarn add pg

const Pool = require('pg').Pool;

//1 - Abrir a conexão
//2 - Executar o comando SQL (query, insert)
//3 - Fechar a conexão

const pool = new Pool ({
    user: 'rqhyabtwuyeaam',
    password: 'c1cddcca28cfa9721d3762ae640bc0da9604cc23aee5ac3c9fe1d50b3bed8689',
    host: 'ec2-52-201-55-4.compute-1.amazonaws.com',
    database:'d7ri4qruv1b1f0',
    port: 5432,
    ssl: {rejectUnauthorized: false }

})

const sql = `
    CREATE TABLE IF NOT EXISTS musicas
    (
        id serial primary key,
        nome varchar (200),
        cantor varchar (200),
        ano int,
        gosta boolean
    )

`;


pool.query(sql, function(error, result) {
    if(error)
         throw error
        
    console.log ('Tabela criada com sucesso!');    

});