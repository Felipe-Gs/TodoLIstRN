
const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const Z = require("zod");
require("dotenv").config();

const client = new Client({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

client.connect();

router.get('/TodasTarefas', (req, res) => {
    try {
        const query = `SELECT * FROM todo_list`;
        client.query(query, (err, results) => {
            if (err) {
                return res.status(404).send({
                    message: 'erro no servidor'
                })
            } else {
                return res.status(200).send({
                    dados: results.rows
                })
            }
        })

    } catch (error) {
        console.log(error)
    }
})

router.post('/addTarefa', (req, res) => {
    try {
        const tarefaBody = Z.object({
            titulo: Z.string(),
            tarefa: Z.string(),

        }).required();

        const validData = tarefaBody.parse(req.body);
        const { titulo, tarefa } = validData;

        const query = `INSERT INTO todo_list (titulo, tarefa) 
        VALUES ($1, $2)`
        const values = [titulo, tarefa];

        client.query(query, values, (err, results) => {
            if (err) {
                return res.status(404).send({
                    message: 'erro no servidor'
                })
            } else {
                return res.status(200).send({
                    message: 'tarefa adicionada com sucesso!'
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
})

router.post('/atualizarCompleto/:id', (req, res) => {
    const id = req.params.id;
    try {
        const completoBody = Z.object({
            completo: Z.boolean()
        }).required();

        const validData = completoBody.parse(req.body);
        const { completo } = validData;
        const query = 'UPDATE todo_list SET completo = $1 WHERE id = $2';
        const values = [completo, id];

        client.query(query, values, (err, result) => {
            if (err) {
                return res.status(500).send({
                    message: 'erro interno no servidor'
                })
            } else {
                return res.status(200).send({
                    message: 'dado atualizado com sucesso!'
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
})

router.get('/tarefasCompletas', (req, res) => {
    try {
        const query = `SELECT * FROM todo_list WHERE completo = true`
        client.query(query, (err, result) => {
            if (result.rows.length > 0) {
                return res.status(200).send({
                    dados: result.rows
                })
            } else {
                return res.status(202).send({
                    message: 'vazio'
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
})

router.get('/tarefasIncompletas', (req, res) => {
    try {
        const query = `SELECT * FROM todo_list WHERE completo = false`
        client.query(query, (err, result) => {
            if (result.rows.length > 0) {
                return res.status(200).send({
                    dados: result.rows
                })
            } else {
                return res.status(202).send({
                    message: 'vazio'
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
})

router.delete('/deletar/:id', (req, res) => {
    const id = req.params.id
    try {
        const query = `DELETE FROM todo_list WHERE id = ${id}`

        client.query(query, (err, result) => {
            return res.status(200).send({
                message: 'deletado com sucesso!'
            })
        })
    } catch (error) {
        console.log(error)
    }
})



module.exports = router;