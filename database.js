// yarn add pg

const Pool = require('pg').Pool;

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
        id serial primeary key,
        nome varchar (200) not null,
        cantor varchar (200) not null,
        ano varchar (4) not null,
        gosta boolean not null
    )

`;

pool.query(sql, function(error, result) {
    if(error)
        throw error

    console.log ('Tabela criada com sucesso!');    

});